/* eslint-disable camelcase */
const { getTransport } = require('../../../utils/transport')
const { validateFields } = require('../../../validation')

const validation = {
  client_id: ['isRequired'],
  client_secret: ['isRequired'],
  refresh_token: ['isRequired']
}

/**
 *  https://tesla-api.timdorr.com/api-basics/authentication#post-oauth-token-grant_type-refresh_token
 *  https://www.teslaapi.io/authentication/oauth#get-access-token
 *
 *  Response
 *
 *  {
 *    "accessToken": "abc123",
 *    "tokenType": "bearer",
 *    "refreshToken": "cba321",
 *    "createdAt": 1538359034,
 *    "expiresIn": 3888000
 *  }
 *
 *  @param {Object} — with required keys `clientId`, `clientSecret`, and `refreshToken`,
 *  @returns {Object} — api response object
 */
const refresh = async ({
  refreshToken: refresh_token,
  clientSecret: client_secret,
  clientId: client_id
}) => {
  const payload = { refresh_token, client_secret, client_id, grant_type: 'refresh_token' }
  validateFields(payload, validation)
  const path = '/oauth/token'
  const { post } = getTransport()
  return post(path, payload)
}

module.exports = refresh
