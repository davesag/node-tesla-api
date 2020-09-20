const axios = require('axios')
const { transportOptions: defaults, defaultHeaders } = require('../defaults')
const transformResponse = require('./transformResponse')
const makeTransformError = require('./makeTransformError')

let transport

const makeTransport = ({ headers: heads, ...options }) => {
  const headers = heads
    ? {
        ...defaultHeaders,
        ...heads
      }
    : defaultHeaders

  const config = {
    ...defaults,
    ...options,
    headers
  }

  transport = axios.create(config)

  transport.interceptors.response.use(transformResponse, makeTransformError(transport))
  // any other config
}

const getTransport = ({ token, ...options } = {}) => {
  if (!transport) makeTransport(options)
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : undefined

  const get = async path => transport.get(path, config)
  const post = async (path, data) => transport.post(path, data, config)

  return { get, post }
}

const close = () => {
  transport = undefined
}

module.exports = { getTransport, close }
