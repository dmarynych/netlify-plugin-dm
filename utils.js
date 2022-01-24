const axios = require('axios');


const { VGS_CLIENT_ID, VGS_CLIENT_SECRET, VGS_VAULT_ID} = process.env;
console.log('env', VGS_CLIENT_ID, VGS_CLIENT_SECRET, VGS_VAULT_ID)
const config = {
  client: {
    id: VGS_CLIENT_ID,
    secret: VGS_CLIENT_SECRET
  },
  auth: {
    tokenHost: 'https://auth.verygoodsecurity.com',
    tokenPath: '/auth/realms/vgs/protocol/openid-connect/token',
    authorizePath: '/auth/realms/vgs/protocol/openid-connect/auth',
  },
  options: {
    // bodyFormat: 'json',
    authorizationMethod: 'body'
  }
};
const { ClientCredentials } = require('simple-oauth2');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function makeHeaders(accessToken, tenantId) {
  const headers = {
    'Content-Type': 'application/vnd.api+json',
    Accept: 'application/vnd.api+json',
    Authorization: `Bearer ${accessToken}`,
  };

  if (tenantId) {
    headers['VGS-Tenant'] = tenantId;
  }

  return headers;
}

async function fetchJSONApi(url, options) {
  const params = {
    url,
    method: options.method,
    data: options.data,
    headers: options.headers,
  };
  return axios.request(params);
}

async function getAccessToken(refreshToken) {
  const client = new ClientCredentials(config);

  const tokenParams = {
    scope: ['routes:write'],
  };

  try {
    const response = await client.getToken(tokenParams, {json: true});
    return response.token.access_token;
  } catch (error) {
    console.log('Access Token error', error);
  }
}

module.exports = {
  makeHeaders,
  fetchJSONApi,
  getAccessToken,
}