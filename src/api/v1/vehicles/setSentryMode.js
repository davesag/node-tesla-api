const { getTransport } = require('../../../utils/transport')
const { validateFields } = require('../../../validation')

const validation = {
  token: ['isRequired'],
  id: ['isRequired'],
  on: ['isRequired']
}

const setSentryMode = async ({ token, id, on }) => {
  validateFields({ token, id, on }, validation)
  const payload = { on }
  const { post } = getTransport({ token })

  return post(`/api/1/vehicles/${id}/command/set_sentry_mode`, payload)
}

module.exports = setSentryMode
