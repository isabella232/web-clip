import { fetch as authenticatedFetch } from '@inrupt/solid-client-authn-browser';
import nock from 'nock';
import { graph, parse } from 'rdflib';
import { Parser as SparqlParser, Update } from 'sparqljs';
import { generateDatePathForToday } from '../api/generateDatePathForToday';
import { generateUuid } from '../api/generateUuid';
import { now } from '../api/now';
import { SessionInfo, SolidApi } from '../api/SolidApi';
import { Store } from '../store/Store';

jest.mock('@inrupt/solid-client-authn-browser');
jest.mock('../api/generateUuid');
jest.mock('../api/generateDatePathForToday');
jest.mock('../api/now');
jest.mock('../options/optionsStorageApi');

describe('extract data from html page', () => {
  let store: Store;
  beforeEach(() => {
    jest.resetAllMocks();
    const rdflibStore = graph();
    parse(
      `
                <https://pod.example/#me>
                <http://www.w3.org/ns/pim/space#storage>
                <https://storage.example/> .
            `,
      rdflibStore,
      'https://pod.example/'
    );
    store = new Store(rdflibStore);
  });

  it('import JSON-LD to rdflib store', async () => {
    nock('https://shop.example').get('/product/0816.html').reply(
      200,
      `
                <!doctype html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport"
                          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>Shop Example - WiFi cable - Product page</title>
                    <script type="application/ld+json">
                    {
                      "@context": "https://schema.org/",
                      "@type": "Product",
                      "name": "WiFi cable",
                      "description": "Increase your WiFi range with this 10m thin-air cable",
                    }
                    
                    </script>
                </head>
                <body>
                </body>
                </html>
            `,
      {
        'Content-Type': 'text/html',
      }
    );

    await store.importFromUrl('https://shop.example/product/0816.html');

    // when the page is bookmarked
    mockFetchWithResponse('');
    (generateUuid as jest.Mock).mockReturnValue('some-uuid');
    (generateDatePathForToday as jest.Mock).mockReturnValue('/2021/03/12');
    (now as jest.Mock).mockReturnValue(
      new Date(Date.UTC(2021, 2, 12, 9, 10, 11, 12))
    );
    const api = new SolidApi(
      {
        isLoggedIn: true,
        webId: 'https://pod.example/#me',
      } as SessionInfo,
      store
    );
    await api.bookmark({
      type: 'WebPage',
      url: 'https://shop.example/product/0816.html',
      name: 'Shop Example - WiFi cable - Product page',
    });

    // then the stored data is stored in the Pod
    expect(authenticatedFetch).toHaveBeenCalled();

    const parser = new SparqlParser();

    const sparqlUpdateCall = (authenticatedFetch as jest.Mock).mock.calls[1];

    const uri = sparqlUpdateCall[0];
    expect(uri).toBe('https://storage.example/webclip/2021/03/12/some-uuid');

    const body = sparqlUpdateCall[1].body;
    const actualQuery = parser.parse(body) as Update;
    const expectedQuery = parser.parse(`
           INSERT DATA {
                <https://storage.example/webclip/2021/03/12/some-uuid#it>
                    a <http://schema.org/BookmarkAction> ;
                    <http://schema.org/startTime> "2021-03-12T09:10:11.012Z"^^<http://schema.org/DateTime> ;
                    <http://schema.org/object> <https://shop.example/product/0816.html> .
                <https://shop.example/product/0816.html> a <http://schema.org/WebPage> ;
                    <http://schema.org/url> <https://shop.example/product/0816.html> ;
                    <http://schema.org/name> "Shop Example - WiFi cable - Product page" ;
                    <http://schema.org/about> <https://storage.example/webclip/2021/03/12/some-uuid#1> .
                    <https://storage.example/webclip/2021/03/12/some-uuid#1> a <http://schema.org/Product> ;
                      <http://schema.org/name> "WiFi cable" ;
                      <http://schema.org/description> "Increase your WiFi range with this 10m thin-air cable" ;
                    .
            }`) as Update;
    expect(actualQuery).toEqual(expectedQuery);
  });
});

function mockFetchWithResponse(bodyText: string) {
  (authenticatedFetch as jest.Mock).mockResolvedValue({
    ok: true,
    headers: new Headers({
      'Content-Type': 'text/turtle',
      'wac-allow': 'user="read write append control",public=""',
      'ms-author-via': 'SPARQL',
    }),
    status: 200,
    statusText: 'OK',
    text: async () => bodyText,
  });
}
