const EXP = /([-_][a-z])/g

const camelCase = str =>
  str.replace(/(_[a-z])/g, s => s.toUpperCase()).replace(/_/g, '')

module.exports = camelCase
