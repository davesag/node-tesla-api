const { getTransport } = require('../../../utils/transport')
const { validateFields } = require('../../../validation')

const validation = {
  token: ['isRequired']
}

const getEntitlements = async ({ token }) => {
  validateFields({ token }, validation)
  const { get } = getTransport({ token })

  return get('/api/1/diagnostics')
}

module.exports = getEntitlements
