const { expect } = require('chai')
const { spy, stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('src/api/v1/oauth/revoke', () => {
  const result = 'hooray'
  const post = stub().resolves(result)
  const getTransport = stub().returns({ post })

  const validateFields = spy()

  const token = 'some amazing token'
  const payload = { token }
  const validation = { token: ['isRequired'] }
  const path = '/oauth/revoke'

  const revoke = proxyquire('../../../../../src/api/v1/oauth/revoke', {
    '../../../utils/transport': { getTransport },
    '../../../validation': { validateFields }
  })

  before(async () => {
    await revoke({ token, some: 'ignored extra data' })
  })

  it('called validateFields', () => {
    expect(validateFields).to.have.been.calledOnceWith(payload, validation)
  })

  it('called getTransport', () => {
    expect(getTransport).to.have.been.calledOnce
  })

  it('called post with the correct parameters', () => {
    expect(post).to.have.been.calledOnceWith(path, payload)
  })
})
