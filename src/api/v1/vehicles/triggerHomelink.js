const { getTransport } = require('../../../utils/transport')
const { validateFields } = require('../../../validation')

const validation = {
  token: ['isRequired'],
  id: ['isRequired'],
  lat: ['isRequired'],
  lon: ['isRequired']
}

/**
 *  https://tesla-api.timdorr.com/vehicle/commands/homelink#post-api-1-vehicles-id-command-trigger_homelink
 *
 *  @param {Object} — with keys `password`, `token`, and `id`.
 *  @returns {Object} — api response object as per docs, but with camelCase keys.
 */
const triggerHomelink = async ({ token, id, lat, lon }) => {
  const payload = { lat, lon }
  validateFields({ ...payload, id, token }, validation)
  const { post } = getTransport({ token })

  return post(`/api/1/vehicles/${id}/command/trigger_homelink`, payload)
}

module.exports = triggerHomelink
