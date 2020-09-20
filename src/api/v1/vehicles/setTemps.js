/* eslint-disable camelcase */

const { getTransport } = require('../../../utils/transport')
const { validateFields } = require('../../../validation')

// TODO: Add validation for the temperature range.  Min seems to be 15.5°C.  Not tested max
const validation = {
  token: ['isRequired'],
  id: ['isRequired'],
  driver_temp: ['isRequired']
}

const setTemps = async ({ token, id, driverTemp: driver_temp, passengerTemp: passenger_temp }) => {
  const payload = { driver_temp, passenger_temp: passenger_temp || driver_temp }
  validateFields({ ...payload, token, id }, validation)
  const { post } = getTransport({ token })

  return post(`/api/1/vehicles/${id}/command/set_temps`, payload)
}

module.exports = setTemps
