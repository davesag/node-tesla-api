const qs = require('querystring')

const { getTransport } = require('../../../utils/transport')
const { validateFields } = require('../../../validation')

const validation = {
  on: ['isRequired'],
  password: ['isRequired']
}

const setValetMode = async ({ token, id, on, password }) => {
  const payload = { on, password }
  const { post } = getTransport({ token })
  validateFields(payload, validation)
  const params = qs.stringify(payload)
  return post(`/api/1/vehicles/${id}/command/set_valet_mode?${params}`)
}

module.exports = setValetMode
