const { getTransport } = require('../../../utils/transport')
const { validateFields } = require('../../../validation')

const validation = {
  token: ['isRequired'],
  id: ['isRequired']
}

/**
 *  https://tesla-api.timdorr.com/api-basics/vehicles
 *
 *  @param {Object} — with keys `token`, and `id`.
 *  @returns {Object} — api response object as per docs, but with camelCase keys.
 */
const vehicle = async ({ token, id }) => {
  validateFields({ token, id }, validation)
  const path = `/api/1/vehicles/${id}`
  const { get } = getTransport({ token })
  return get(path)
}

module.exports = vehicle
