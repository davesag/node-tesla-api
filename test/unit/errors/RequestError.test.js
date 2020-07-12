const { expect } = require('chai')

const RequestError = require('../../../src/errors/RequestError')

describe('errors/RequestError', () => {
  const message = 'a message'

  context('given detail', () => {
    const detail = 'detail'

    const error = new RequestError(message, detail)

    it('has the message', () => {
      expect(error).to.have.property('message', message)
    })

    it('has the detail', () => {
      expect(error).to.have.property('message', message)
    })
  })

  context('no details', () => {
    const error = new RequestError(message)

    it('details are undefined', () => {
      expect(error.details).to.be.undefined
    })
  })
})
