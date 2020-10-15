const makeValidationTest = require('../../helpers/makeValidationTest')

const isRequired = require('../../../src/validation/isRequired')

describe('validation/isRequired', () => {
  const doTest = makeValidationTest(isRequired)
  const err = 'Field is required'

  ;[
    ['NaN', NaN, err],
    ['the number 5', 5, null],
    ['the number 0', 0, null],
    ['a string', 'test', null],
    ['an empty string', '', err],
    ['an empty array', [], err],
    ['an array', ['test'], null],
    ['an object', { test: 'test' }, null],
    ['an empty object', {}, err],
    ['undefined', undefined, err],
    ['null', null, err],
    ['true', true, null]
  ].forEach(doTest)
})
