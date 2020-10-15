const { getTransport } = require('../../../utils/transport')
const { validateFields } = require('../../../validation')

const validation = {
  token: ['isRequired'],
  id: ['isRequired'],
  on: ['isRequired'],
  password: ['isRequired']
}

const setValetMode = async ({ token, id, on, password }) => {
  const payload = { on, password }
  const { post } = getTransport({ token })
  validateFields({ ...payload, id, token }, validation)
  return post(`/api/1/vehicles/${id}/command/set_valet_mode`, payload)
}

module.exports = setValetMode
