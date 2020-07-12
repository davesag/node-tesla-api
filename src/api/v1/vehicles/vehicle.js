const { getTransport } = require('../../../utils/transport')

/**
 *  https://tesla-api.timdorr.com/api-basics/vehicles
 *
 *  @param {Object} — with keys `token`, and `id`.
 *  @returns {Object} — api response object as per docs, but with camelCase keys.
 */
const vehicle = async ({ token, id }) => {
  const path = `/api/1/vehicles/${id}`
  const { get } = getTransport({ token })
  return get(path)
}

module.exports = vehicle
