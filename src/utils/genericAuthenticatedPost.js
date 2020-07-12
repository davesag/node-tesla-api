const { getTransport } = require('./transport')

const genericAuthenticatedPost = path => async ({ token, id }) => {
  const { post } = getTransport({ token })
  return post(`/api/1/vehicles/${id}/${path}`)
}

module.exports = genericAuthenticatedPost
