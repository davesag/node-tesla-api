const identity = value => value

const defined = (value, fn = identity) =>
  typeof value === 'number' && isNaN(value) ? NaN : value === undefined ? undefined : fn(value)

module.exports = defined
