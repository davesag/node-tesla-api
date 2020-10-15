const { getTransport } = require('../../../utils/transport')
const { validateFields } = require('../../../validation')

const validation = {
  token: ['isRequired'],
  id: ['isRequired'],
  state: ['isRequired']
}

const sunRoofControl = async ({ token, id, state, percent }) => {
  const payload = state === 'move' ? { state, percent } : { state }
  const { post } = getTransport({ token })
  validateFields({ ...payload, token, id }, validation)
  return post(`/api/1/vehicles/${id}/command/sun_roof_control`, payload)
}

module.exports = sunRoofControl
