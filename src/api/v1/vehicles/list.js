const { getTransport } = require('../../../utils/transport')
const { validateFields } = require('../../../validation')

const validation = {
  token: ['isRequired']
}

/**
 *  https://tesla-api.timdorr.com/api-basics/vehicles
 *
 *  @param {Object} — with key `token`
 *  @returns {Object} — api response object as per docs, but with camelCase keys.
 */
const list = async ({ token }) => {
  const path = '/api/1/vehicles'
  validateFields({ token }, validation)
  const { get } = getTransport({ token })
  return get(path)
}

module.exports = list
