/* eslint-disable camelcase */
const { expect } = require('chai')
const { spy, stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('src/api/v1/logs/getEntitlements', () => {
  const result = 'hooray'
  const get = stub().resolves(result)
  const getTransport = stub().returns({ get })

  const validateFields = spy()

  const token = 'some awesome token'

  const payload = { token }
  const validation = {
    token: ['isRequired']
  }

  const path = '/api/1/diagnostics'

  const getEntitlements = proxyquire('../../../../../src/api/v1/logs/getEntitlements', {
    '../../../utils/transport': { getTransport },
    '../../../validation': { validateFields }
  })

  before(async () => {
    await getEntitlements({ token })
  })

  it('called validateFields', () => {
    expect(validateFields).to.have.been.calledOnceWith(payload, validation)
  })

  it('called getTransport', () => {
    expect(getTransport).to.have.been.calledOnce
  })

  it('called get with the correct parameters', () => {
    expect(get).to.have.been.calledOnceWith(path)
  })
})
