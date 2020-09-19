/* eslint-disable camelcase */
const { expect } = require('chai')
const { spy, stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('src/api/v1/vehicles/vehicle', () => {
  const result = ['hooray']
  const get = stub().resolves(result)
  const getTransport = stub().returns({ get })

  const validateFields = spy()

  const token = 'some token'
  const id = 'some id'

  const payload = { token, id }
  const validation = {
    token: ['isRequired'],
    id: ['isRequired']
  }

  const path = `/api/1/vehicles/${id}`

  const vehicle = proxyquire('../../../../../src/api/v1/vehicles/vehicle', {
    '../../../utils/transport': { getTransport },
    '../../../validation': { validateFields }
  })

  before(async () => {
    await vehicle(payload)
  })

  it('called validateFields', () => {
    expect(validateFields).to.have.been.calledOnceWith(payload, validation)
  })

  it('called getTransport with the token', () => {
    expect(getTransport).to.have.been.calledOnceWith({ token })
  })

  it('called get with the correct path', () => {
    expect(get).to.have.been.calledOnceWith(path)
  })
})
