const { getTransport } = require('../../../utils/transport')
const { validateFields } = require('../../../validation')

const validation = {
  token: ['isRequired'],
  id: ['isRequired'],
  which: ['isRequired'] // TODO: add oneOf(['front', 'rear']) validation
}

const actuateTrunk = async ({ token, id, which }) => {
  validateFields({ token, id, which }, validation)
  const payload = { which_trunk: which }
  const { post } = getTransport({ token })

  return post(`/api/1/vehicles/${id}/command/actuate_trunk`, payload)
}

module.exports = actuateTrunk
