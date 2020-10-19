/* eslint-disable camelcase */
const { expect } = require('chai')
const { spy, stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('src/api/v1/logs/sendEntitlements', () => {
  const result = 'hooray'
  const post = stub().resolves(result)
  const getTransport = stub().returns({ post })

  const validateFields = spy()

  const token = 'some awesome token'

  const payload = { token }
  const validation = {
    token: ['isRequired']
  }

  const path = '/api/1/diagnostics'

  const sendEntitlements = proxyquire('../../../../../src/api/v1/logs/sendEntitlements', {
    '../../../utils/transport': { getTransport },
    '../../../validation': { validateFields }
  })

  before(async () => {
    await sendEntitlements({ token })
  })

  it('called validateFields', () => {
    expect(validateFields).to.have.been.calledOnceWith(payload, validation)
  })

  it('called getTransport', () => {
    expect(getTransport).to.have.been.calledOnce
  })

  it('called post with the correct parameters', () => {
    expect(post).to.have.been.calledOnceWith(path)
  })
})
