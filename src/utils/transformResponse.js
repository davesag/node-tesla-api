const fixKeys = require('./fixKeys')

const transformResponse = response => fixKeys(response.data)

module.exports = transformResponse
