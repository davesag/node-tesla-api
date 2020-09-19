const { expect } = require('chai')

const makeExistenceTest = (obj, type) => name => {
  it(`has a function '${name}'`, () => {
    expect(obj).to.have.a.property(name).that.is.a(type)
  })
}

module.exports = makeExistenceTest
