const qs = require('querystring')

const { getTransport } = require('../../../utils/transport')
const { validateFields } = require('../../../validation')

const validation = {
  percent: ['isRequired']
}

const setChargeLimit = async ({ token, id, percent }) => {
  const payload = { percent }
  const { post } = getTransport({ token })
  validateFields(payload, validation)
  const params = qs.stringify(payload)
  return post(`/api/1/vehicles/${id}/command/set_charge_limit?${params}`)
}

module.exports = setChargeLimit
