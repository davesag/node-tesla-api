const safeFn = require('../utils/safeFn')
const RequestError = require('./RequestError')

class ResponseError extends RequestError {
  constructor(message, status, details) {
    super(message, details)
    this.name = this.constructor.name
    safeFn(Error.captureStackTrace, this, this.constructor)
    this.status = status || 400
  }
}

module.exports = ResponseError
