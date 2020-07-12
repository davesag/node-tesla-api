const { getTransport } = require('../../../utils/transport')
const { validateFields } = require('../../../validation')

const validation = {
  email: ['isRequired'],
  password: ['isRequired'],
  client_secret: ['isRequired'],
  client_id: ['isRequired'],
  grant_type: ['isRequired']
}

/**
 *  https://tesla-api.timdorr.com/api-basics/authentication
 *
 *  @param {Object} — with keys `email`, `password`, clientSecret, `clientId`, `grantType`, `id` and `token`
 *  @returns {Object} — api response object as per docs, but with camelCase keys.
 */
const token = async ({
  email,
  password,
  clientSecret: client_secret,
  clientId: client_id,
  grantType: grant_type
}) => {
  const payload = { email, password, client_secret, client_id, grant_type }
  validateFields(payload, validation)
  const path = '/oauth/token'
  const { post } = getTransport()
  return post(path, payload)
}

module.exports = token
