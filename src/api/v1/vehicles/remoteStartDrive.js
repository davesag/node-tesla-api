const qs = require('querystring')

const { getTransport } = require('../../../utils/transport')
const { validateFields } = require('../../../validation')

const validation = {
  password: ['isRequired']
}

/**
 *  https://tesla-api.timdorr.com/vehicle/commands/remotestart
 *
 *  @param {Object} — with keys `password`, `token`, and `id`.
 *  @returns {Object} — api response object as per docs, but with camelCase keys.
 */
const remoteStartDrive = async ({ token, id, password }) => {
  const payload = { password }
  const { post } = getTransport({ token })
  validateFields(payload, validation)
  const params = qs.stringify(payload)
  return post(`/api/1/vehicles/${id}/command/remote_start_drive?${params}`)
}

module.exports = remoteStartDrive
