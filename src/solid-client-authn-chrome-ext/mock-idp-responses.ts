export const openIdConfiguration = {
  authorization_endpoint: 'https://pod.test/idp/auth',
  claims_parameter_supported: true,
  claims_supported: ['webid', 'client_id', 'sub', 'sid', 'auth_time', 'iss'],
  code_challenge_methods_supported: ['S256'],
  end_session_endpoint: 'https://pod.test/idp/session/end',
  grant_types_supported: ['implicit', 'authorization_code', 'refresh_token'],
  id_token_signing_alg_values_supported: ['HS256', 'RS256'],
  issuer: 'https://pod.test/',
  jwks_uri: 'https://pod.test/idp/jwks',
  registration_endpoint: 'https://pod.test/idp/reg',
  response_modes_supported: ['form_post', 'fragment', 'query'],
  response_types_supported: ['code id_token', 'code', 'id_token', 'none'],
  scopes_supported: ['openid', 'profile', 'offline_access'],
  subject_types_supported: ['public', 'pairwise'],
  token_endpoint_auth_methods_supported: [
    'none',
    'client_secret_basic',
    'client_secret_jwt',
    'client_secret_post',
    'private_key_jwt',
  ],
  token_endpoint_auth_signing_alg_values_supported: [
    'HS256',
    'RS256',
    'PS256',
    'ES256',
    'EdDSA',
  ],
  token_endpoint: 'https://pod.test/idp/token',
  request_object_signing_alg_values_supported: [
    'HS256',
    'RS256',
    'PS256',
    'ES256',
    'EdDSA',
  ],
  request_parameter_supported: false,
  request_uri_parameter_supported: true,
  require_request_uri_registration: true,
  userinfo_endpoint: 'https://pod.test/idp/me',
  userinfo_signing_alg_values_supported: ['HS256', 'RS256'],
  introspection_endpoint: 'https://pod.test/idp/token/introspection',
  introspection_endpoint_auth_methods_supported: [
    'none',
    'client_secret_basic',
    'client_secret_jwt',
    'client_secret_post',
    'private_key_jwt',
  ],
  introspection_endpoint_auth_signing_alg_values_supported: [
    'HS256',
    'RS256',
    'PS256',
    'ES256',
    'EdDSA',
  ],
  dpop_signing_alg_values_supported: ['RS256', 'PS256', 'ES256', 'EdDSA'],
  revocation_endpoint: 'https://pod.test/idp/token/revocation',
  revocation_endpoint_auth_methods_supported: [
    'none',
    'client_secret_basic',
    'client_secret_jwt',
    'client_secret_post',
    'private_key_jwt',
  ],
  revocation_endpoint_auth_signing_alg_values_supported: [
    'HS256',
    'RS256',
    'PS256',
    'ES256',
    'EdDSA',
  ],
  claim_types_supported: ['normal'],
  solid_oidc_supported: 'https://solidproject.org/TR/solid-oidc',
};

export const registerResponse = {
  application_type: 'web',
  grant_types: ['authorization_code'],
  id_token_signed_response_alg: 'RS256',
  require_auth_time: false,
  response_types: ['code'],
  subject_type: 'pairwise',
  token_endpoint_auth_method: 'client_secret_basic',
  introspection_endpoint_auth_method: 'client_secret_basic',
  revocation_endpoint_auth_method: 'client_secret_basic',
  require_signed_request_object: false,
  client_id_issued_at: 1635173530,
  client_id: 'mock-client-id',
  client_name: 'My Example App',
  client_secret_expires_at: 0,
  client_secret: 'mock-client-secret',
  redirect_uris: ['https://example.test/redirect-url'],
  registration_client_uri: 'https://pod.test/idp/reg/mock-client-id',
  registration_access_token: 'mock-registration-access-token',
};

export const tokenResponse = {
  access_token: 'mock-access-token',
  id_token: 'mock-id-token',
  token_type: 'DPoP',
};

export const jwksResponse = {
  keys: [
    {
      kid: 'mock-kid',
      kty: 'RSA',
      alg: 'RS256',
      key_ops: ['verify'],
      ext: true,
      n: 'n',
      e: 'AQAB',
    },
  ],
};
