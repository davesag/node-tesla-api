const qs = require('querystring')

const { getTransport } = require('../../../utils/transport')
const { validateFields } = require('../../../validation')

const validation = {
  state: ['isRequired']
}

const sunRoofControl = async ({ token, id, state, percent }) => {
  const payload = state === 'move' ? { state, percent } : { state }
  const { post } = getTransport({ token })
  validateFields(payload, validation)
  const params = qs.stringify(payload)
  return post(`/api/1/vehicles/${id}/command/sun_roof_control?${params}`)
}

module.exports = sunRoofControl
