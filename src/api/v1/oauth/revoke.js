const { getTransport } = require('../../../utils/transport')
const { validateFields } = require('../../../validation')

const validation = {
  token: ['isRequired']
}

/**
 *  https://www.teslaapi.io/authentication/oauth#get-access-token
 *
 *  @param {Object} — with key `token`, a string.
 *  @returns {Object} — api response object as per docs, but with camelCase keys.
 */
const revoke = async ({ token }) => {
  const payload = { token }
  validateFields(payload, validation)
  const path = '/oauth/revoke'
  const { post } = getTransport()
  return post(path, payload)
}

module.exports = revoke
