const { expect } = require('chai')

const ValidationError = require('../../../src/errors/ValidationError')

describe('errors/ValidationError', () => {
  const errors = { orderGuid: [undefined, 'isRequired'] }
  const error = new ValidationError(errors)

  it('has a message', () => {
    expect(error).to.have.property('message', 'Validation errors were found')
  })

  it('has the errors', () => {
    expect(error.errors).to.deep.equal(errors)
  })
})
