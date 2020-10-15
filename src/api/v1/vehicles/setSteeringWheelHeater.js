const qs = require('querystring')

const { getTransport } = require('../../../utils/transport')
const { validateFields } = require('../../../validation')

const validation = {
  token: ['isRequired'],
  id: ['isRequired'],
  on: ['isRequired']
}

const setSteeringWheelHeater = async ({ token, id, on }) => {
  const payload = { on }
  const { post } = getTransport({ token })
  validateFields({ ...payload, token, id }, validation)
  return post(`/api/1/vehicles/${id}/command/remote_steering_wheel_heater_request`, payload)
}

module.exports = setSteeringWheelHeater
