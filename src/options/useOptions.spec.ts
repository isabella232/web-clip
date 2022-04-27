import { act, renderHook, RenderResult } from '@testing-library/react-hooks';
import { when } from 'jest-when';
import { useAuthentication } from './auth/AuthenticationContext';
import { ActionType } from './reducer';
import { useOptions } from './useOptions';
import { save as saveOptions, load as loadOptions } from './optionsStorageApi';

jest.mock('./optionsStorageApi');
jest.mock('./auth/AuthenticationContext');

describe('useOptions', () => {
  let renderResult: RenderResult<ReturnType<typeof useOptions>>;

  beforeEach(async () => {
    when(useAuthentication).mockReturnValue({
      session: {
        info: {
          isLoggedIn: false,
          sessionId: '1234',
        },
      },
      redirectUrl: '',
    });
    (saveOptions as jest.Mock).mockResolvedValue(undefined);
    (loadOptions as jest.Mock).mockResolvedValue({
      providerUrl: 'https://pod.provider.example',
    });
    const render = renderHook(() => useOptions());
    renderResult = render.result;

    await render.waitForNextUpdate();
  });

  describe('on mount', () => {
    it('indicates loading', async () => {
      expect(renderResult.all[0]).toMatchObject({
        loading: true,
      });
    });

    it('returns loaded options', async () => {
      expect(renderResult.all[1]).toMatchObject({
        loading: false,
        providerUrl: 'https://pod.provider.example',
      });
    });
  });

  describe('change provider url', () => {
    it('updates the value', async () => {
      (loadOptions as jest.Mock).mockResolvedValue({
        providerUrl: 'https://pod.provider.example',
      });
      const { result, waitForNextUpdate } = renderHook(() => useOptions());

      await waitForNextUpdate();

      act(() => {
        result.current.dispatch({
          type: ActionType.SET_PROVIDER_URL,
          payload: 'https://new.provider.example',
        });
      });

      expect(result.current.providerUrl).toBe('https://new.provider.example');
    });
  });

  describe('on login', () => {
    it('saves the provider url', async () => {
      (saveOptions as jest.Mock).mockResolvedValue(null);
      const { result, waitForNextUpdate } = renderHook(() => useOptions());

      act(() => {
        result.current.dispatch({
          type: ActionType.SET_PROVIDER_URL,
          payload: 'https://new.provider.example',
        });
      });

      act(() => {
        result.current.onLogin();
      });

      await waitForNextUpdate();

      expect(saveOptions).toHaveBeenCalledWith({
        providerUrl: 'https://new.provider.example',
      });
      expect(result.current.saved).toBe(true);
    });
  });
});
