const ResponseError = require('../errors/ResponseError')
const RequestError = require('../errors/RequestError')
const defined = require('./defined')

const MAX_RETRIES = 3
const DELAY = 250

const maxRetries = config => defined(config._retryCount) && config._retryCount === MAX_RETRIES

const delay = config => (config._retryCount ? (config._retryCount + 1) * DELAY : DELAY)

const increment = config => ({
  ...config,
  timeout: config.timeout + delay(config),
  _retryCount: config._retryCount ? config._retryCount + 1 : 1
})

const canRetry = error =>
  error.code === 'ECONNABORTED' &&
  error.config &&
  error.config.method.toLowerCase() === 'get' &&
  !maxRetries(error.config)

const transformError = transport => error => {
  // console.log('caught error', error)

  if (canRetry(error)) {
    return new Promise(resolve =>
      setTimeout(() => resolve(transport(increment(error.config))), delay(error.config))
    )
  }

  const details = error.config ? { method: error.config.method, url: error.config.url } : {}
  if (error.code) details.code = error.code

  if (error.response) {
    throw new ResponseError(error.response.data.error, error.response.status, details)
  }

  if (error.request) {
    throw new RequestError(error.message, details)
  }

  throw new Error(error.message)
}

module.exports = transformError
