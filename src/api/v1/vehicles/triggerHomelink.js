const qs = require('querystring')

const { getTransport } = require('../../../utils/transport')
const { validateFields } = require('../../../validation')

const validation = {
  token: ['isRequired'],
  id: ['isRequired'],
  lat: ['isRequired'],
  lon: ['isRequired']
}

/**
 *  https://tesla-api.timdorr.com/vehicle/commands/remotestart
 *
 *  @param {Object} — with keys `password`, `token`, and `id`.
 *  @returns {Object} — api response object as per docs, but with camelCase keys.
 */
const triggerHomelink = async ({ token, id, lat, lon }) => {
  const payload = { lat, lon }
  const { post } = getTransport({ token })
  validateFields(payload, validation)
  const params = qs.stringify(payload)
  return post(`/api/1/vehicles/${id}/command/trigger_homelink?${params}`)
}

module.exports = triggerHomelink
