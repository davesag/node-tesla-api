const { getTransport } = require('../../../utils/transport')
const { validateFields } = require('../../../validation')

const validation = {
  token: ['isRequired'],
  id: ['isRequired'],
  offset: ['isRequired'] // TODO: add is positive
}

const scheduleSoftwareUpdate = async ({ token, id, offset = 0 }) => {
  validateFields({ offset, token, id }, validation)
  const payload = { offset_sec: offset }
  const { post } = getTransport({ token })

  return post(`/api/1/vehicles/${id}/command/schedule_software_update`, payload)
}

module.exports = scheduleSoftwareUpdate
