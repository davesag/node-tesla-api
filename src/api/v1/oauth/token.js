/* eslint-disable camelcase */
const { getTransport } = require('../../../utils/transport')
const { validateFields } = require('../../../validation')

const validation = {
  email: ['isRequired'],
  password: ['isRequired'],
  client_secret: ['isRequired'],
  client_id: ['isRequired']
}

/**
 *  https://tesla-api.timdorr.com/api-basics/authentication#post-oauth-token-grant_type-password
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
 *  @param {Object} — with required keys `email`, `password`, clientSecret, `clientId`
 *  @returns {Object} — api response object
 */
const token = async ({ email, password, clientSecret: client_secret, clientId: client_id }) => {
  const payload = { email, password, client_secret, client_id, grant_type: 'password' }
  validateFields(payload, validation)
  const path = '/oauth/token'
  const { post } = getTransport()
  return post(path, payload)
}

module.exports = token
