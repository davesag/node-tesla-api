const { expect } = require('chai')

const makeValidationTest = validation => ([label, value, expected]) => {
  context(`given ${label}`, () => {
    it(`returns ${expected}`, () => {
      expect(validation(value)).to.equal(expected)
    })
  })
}

module.exports = makeValidationTest
