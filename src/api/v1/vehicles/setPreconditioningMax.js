const { getTransport } = require('../../../utils/transport')
const { validateFields } = require('../../../validation')

const validation = {
  token: ['isRequired'],
  id: ['isRequired'],
  on: ['isRequired']
}

const setPreconditioningMax = async ({ token, id, on }) => {
  validateFields({ on, token, id }, validation)
  const payload = { on }
  const { post } = getTransport({ token })

  return post(`/api/1/vehicles/${id}/command/set_preconditioning_max`, payload)
}

module.exports = setPreconditioningMax
