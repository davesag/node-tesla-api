const camelCase = require('./camelCase')

const fixKeys = input =>
  input
    ? Array.isArray(input)
      ? input.map(fixKeys)
      : typeof input === 'object'
      ? Object.keys(input).reduce((acc, elem) => {
          acc[camelCase(elem)] = fixKeys(input[elem])
          return acc
        }, {})
      : input
    : input

module.exports = fixKeys
