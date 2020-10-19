const { getTransport } = require('../../../utils/transport')
const { validateFields } = require('../../../validation')

const validation = {
  token: ['isRequired'],
  id: ['isRequired'],
  on: ['isRequired']
}

const setValetMode = async ({ token, id, on, password }) => {
  validateFields({ token, id, on }, validation)
  const payload = password ? { on, password } : { on }
  const { post } = getTransport({ token })

  return post(`/api/1/vehicles/${id}/command/set_valet_mode`, payload)
}

module.exports = setValetMode
