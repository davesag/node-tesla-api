const { getTransport } = require('../../../utils/transport')
const { validateFields } = require('../../../validation')

const validation = {
  token: ['isRequired'],
  id: ['isRequired'],
  password: ['isRequired']
}

/**
 *  https://tesla-api.timdorr.com/vehicle/commands/remotestart
 *
 *  @param {Object} — with keys `password`, `token`, and `id`.
 *  @returns {Object} — api response object as per docs, but with camelCase keys.
 */
const remoteStartDrive = async ({ token, id, password }) => {
  validateFields({ token, id, password }, validation)
  const payload = { password }
  const { post } = getTransport({ token })

  return post(`/api/1/vehicles/${id}/command/remote_start_drive`, payload)
}

module.exports = remoteStartDrive
