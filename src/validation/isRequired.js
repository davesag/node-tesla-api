const checkRequired = value =>
  typeof value === 'number'
    ? !isNaN(value)
    : Array.isArray(value) || typeof value === 'string'
    ? value.length !== 0
    : value === undefined || value === null
    ? false
    : typeof value === 'boolean'
    ? true
    : typeof value === 'object' && Object.keys(value).length !== 0

const isRequired = value => (checkRequired(value) ? null : 'Field is required')

module.exports = isRequired
