const transportOptions = {
  baseURL: 'https://owner-api.teslamotors.com',
  timeout: 2500
}

const defaultHeaders = {
  'Content-Type': 'application/json',
  'User-Agent': 'Unofficial NodeJS Tesla API (github.com/davesag/node-tesla-api)'
}

const defaultParams = {}

module.exports = {
  defaultHeaders,
  defaultParams,
  transportOptions
}
