const { getTransport } = require('../../../utils/transport')
const { validateFields } = require('../../../validation')

const validation = {
  token: ['isRequired'],
  id: ['isRequired'],
  state: ['isRequired'] // TODO: oneOf(['vent', 'open'])
}

const sunRoofControl = async ({ token, id, state }) => {
  validateFields({ token, id, state }, validation)
  const payload = { state }
  const { post } = getTransport({ token })

  return post(`/api/1/vehicles/${id}/command/sun_roof_control`, payload)
}

module.exports = sunRoofControl
