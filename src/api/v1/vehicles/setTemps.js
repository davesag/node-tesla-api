/* eslint-disable camelcase */
const qs = require('querystring')

const { getTransport } = require('../../../utils/transport')
const { validateFields } = require('../../../validation')

const validation = {
  driver_temp: ['isRequired'],
  passenger_temp: ['isRequired']
}

const setTemps = async ({ token, id, driverTemp: driver_temp, passengerTemp: passenger_temp }) => {
  const payload = { driver_temp, passenger_temp }
  const { post } = getTransport({ token })
  validateFields(payload, validation)
  const params = qs.stringify(payload)
  return post(`/api/1/vehicles/${id}/command/set_temps?${params}`)
}

module.exports = setTemps
