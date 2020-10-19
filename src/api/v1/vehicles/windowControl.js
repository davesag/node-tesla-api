const { getTransport } = require('../../../utils/transport')
const { validateFields } = require('../../../validation')

const validation = {
  token: ['isRequired'],
  id: ['isRequired'],
  command: ['isRequired'], // TODO: add oneOf(['vent', 'close'])
  lat: ['isRequired'], // TODO: add numeric, positive
  lon: ['isRequired']
}

const windowControl = async ({ token, id, command, lat = 0, lon = 0 }) => {
  const payload = { command, lat, lon }
  validateFields({ ...payload, token, id }, validation)
  const { post } = getTransport({ token })

  return post(`/api/1/vehicles/${id}/command/window_control`, payload)
}

module.exports = windowControl
