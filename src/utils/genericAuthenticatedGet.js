const { getTransport } = require('./transport')

const genericAuthenticatedGet = path => async ({ token, id }) => {
  const { get } = getTransport({ token })
  return get(`/api/1/vehicles/${id}/${path}`)
}

module.exports = genericAuthenticatedGet
