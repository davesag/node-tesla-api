const { getTransport } = require('../../../utils/transport')
const { validateFields } = require('../../../validation')

const validation = {
  token: ['isRequired']
}

const sendEntitlements = async ({ token }) => {
  validateFields({ token }, validation)
  const { post } = getTransport({ token })

  return post('/api/1/diagnostics') // seems to always just return okay no matter what payload you send it.
}

module.exports = sendEntitlements
