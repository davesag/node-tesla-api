const { expect } = require('chai')
const { spy, stub, resetHistory } = require('sinon')
const proxyquire = require('proxyquire')

describe('src/api/v1/vehicles/setValetMode', () => {
  const result = ['hooray']
  const post = stub().resolves({ result })
  const getTransport = stub().returns({ post })

  const validateFields = spy()

  const token = 'some token'
  const id = 'some id'
  const on = true

  const validation = {
    token: ['isRequired'],
    id: ['isRequired'],
    on: ['isRequired']
  }

  const path = `/api/1/vehicles/${id}/command/set_valet_mode`

  const setValetMode = proxyquire('../../../../../src/api/v1/vehicles/setValetMode', {
    '../../../utils/transport': { getTransport },
    '../../../validation': { validateFields }
  })

  context('with a password', () => {
    const password = 1234
    const payload = { token, id, on, password }

    before(async () => {
      await setValetMode(payload)
    })

    after(resetHistory)

    it('called validateFields', () => {
      expect(validateFields).to.have.been.calledOnceWith({ id, token, on }, validation)
    })

    it('called getTransport with the token', () => {
      expect(getTransport).to.have.been.calledOnceWith({ token })
    })

    it('called post with the correct path and payload', () => {
      expect(post).to.have.been.calledOnceWith(path, { on, password })
    })
  })

  context('without a password', () => {
    const payload = { token, id, on }

    before(async () => {
      await setValetMode(payload)
    })

    after(resetHistory)

    it('called validateFields', () => {
      expect(validateFields).to.have.been.calledOnceWith({ id, token, on }, validation)
    })

    it('called getTransport with the token', () => {
      expect(getTransport).to.have.been.calledOnceWith({ token })
    })

    it('called post with the correct path and payload', () => {
      expect(post).to.have.been.calledOnceWith(path, { on })
    })
  })
})
