const { getTransport } = require('../../../utils/transport')
const { validateFields } = require('../../../validation')

const validation = {
  token: ['isRequired'],
  id: ['isRequired'],
  percent: ['isRequired']
}

const setChargeLimit = async ({ token, id, percent }) => {
  const payload = { percent }
  const { post } = getTransport({ token })
  validateFields({ ...payload, token, id }, validation)
  return post(`/api/1/vehicles/${id}/command/set_charge_limit`, payload)
}

module.exports = setChargeLimit
