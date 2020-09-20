/* eslint-disable camelcase */
const { expect } = require('chai')
const { spy, stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('src/api/v1/vehicles/list', () => {
  const result = ['hooray']
  const get = stub().resolves(result)
  const getTransport = stub().returns({ get })

  const validateFields = spy()

  const token = 'some token'

  const payload = { token }
  const validation = {
    token: ['isRequired']
  }

  const path = '/api/1/vehicles'

  const list = proxyquire('../../../../../src/api/v1/vehicles/list', {
    '../../../utils/transport': { getTransport },
    '../../../validation': { validateFields }
  })

  before(async () => {
    await list(payload)
  })

  it('called validateFields', () => {
    expect(validateFields).to.have.been.calledOnceWith(payload, validation)
  })

  it('called getTransport with the token', () => {
    expect(getTransport).to.have.been.calledOnceWith(payload)
  })

  it('called get with the correct path', () => {
    expect(get).to.have.been.calledOnceWith(path)
  })
})
