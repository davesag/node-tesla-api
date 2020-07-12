const { expect } = require('chai')

const ResponseError = require('../../../src/errors/ResponseError')

describe('errors/ResponseError', () => {
  const message = 'a message'

  context('given a status', () => {
    const status = 404

    context('given detail', () => {
      const details = 'details'

      const error = new ResponseError(message, status, details)

      it('has the message', () => {
        expect(error).to.have.property('message', message)
      })

      it('has the status', () => {
        expect(error).to.have.property('status', status)
      })

      it('has the details', () => {
        expect(error).to.have.property('details', details)
      })
    })

    context('given no details', () => {
      const error = new ResponseError(message, status)

      it('details are undefined', () => {
        expect(error.details).to.be.undefined
      })
    })
  })

  context('given no status', () => {
    const error = new ResponseError(message)

    it('has the default status', () => {
      expect(error).to.have.property('status', 400)
    })
  })
})
