const { getTransport } = require('../../../utils/transport')

/**
 *  https://tesla-api.timdorr.com/api-basics/vehicles
 *
 *  @param {Object} — with key `token`
 *  @returns {Object} — api response object as per docs, but with camelCase keys.
 */
const list = async ({ token }) => {
  const path = '/api/1/vehicles'
  const { get } = getTransport({ token })
  return get(path)
}

module.exports = list
