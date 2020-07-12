const ValidationError = require('../errors/ValidationError')

// add more as needed.
const VALIDATIONS = {
  isRequired: require('./isRequired')
}

const validateFields = (payload, rules) => {
  const errors = Object.keys(payload).reduce((acc, elem) => {
    const validations = rules[elem] || []
    validations.forEach(rule => {
      const validator = typeof rule === 'string' ? VALIDATIONS[rule] : rule
      const value = payload[elem]
      const result = validator(value)
      if (result) {
        acc[elem] = acc[elem] || []
        acc[elem].push([value, result])
      }
    })
    return acc
  }, {})

  if (Object.keys(errors).length !== 0) throw new ValidationError(errors)
}

module.exports = { validateFields }
