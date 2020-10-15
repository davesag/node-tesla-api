const qs = require('querystring')

const { getTransport } = require('../../../utils/transport')
const { validateFields } = require('../../../validation')

const validation = {
  token: ['isRequired'],
  id: ['isRequired'],
  on: ['isRequired']
}

const setPreconditioningMax = async ({ token, id, on }) => {
  const payload = { on }
  const { post } = getTransport({ token })
  validateFields({ ...payload, token, id }, validation)
  return post(`/api/1/vehicles/${id}/command/set_preconditioning_max`, payload)
}

module.exports = setPreconditioningMax
