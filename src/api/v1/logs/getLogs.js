const { getTransport } = require('../../../utils/transport')
const { validateFields } = require('../../../validation')

const validation = {
  token: ['isRequired']
}

const getLogs = async ({ token }) => {
  validateFields({ token }, validation)
  const { post } = getTransport({ token })

  return post('/api/1/logs')
}

module.exports = getLogs
