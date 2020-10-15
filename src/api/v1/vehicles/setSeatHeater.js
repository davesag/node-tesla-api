const qs = require('querystring')

const { getTransport } = require('../../../utils/transport')
const { validateFields } = require('../../../validation')

const validation = {
  token: ['isRequired'],
  id: ['isRequired'],
  heater: ['isRequired'],
  level: ['isRequired']
}

const setSeatHeater = async ({ token, id, heater, level }) => {
  const payload = { heater, level }
  const { post } = getTransport({ token })
  validateFields({ ...payload, token, id }, validation)
  return post(`/api/1/vehicles/${id}/command/remote_seat_heater_request`, payload)
}

module.exports = setSeatHeater
