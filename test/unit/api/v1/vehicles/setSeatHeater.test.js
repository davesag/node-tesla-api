/* eslint-disable camelcase */
const { expect } = require('chai')
const { spy, stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('src/api/v1/vehicles/setSeatHeater', () => {
  const result = ['hooray']
  const post = stub().resolves({ result })
  const getTransport = stub().returns({ post })

  const validateFields = spy()

  const token = 'some token'
  const id = 'some id'
  const heater = 1
  const level = 2

  const payload = { token, id, heater, level }
  const validation = {
    token: ['isRequired'],
    id: ['isRequired'],
    heater: ['isRequired'],
    level: ['isRequired']
  }

  const path = `/api/1/vehicles/${id}/command/remote_seat_heater_request`

  const setSeatHeater = proxyquire('../../../../../src/api/v1/vehicles/setSeatHeater', {
    '../../../utils/transport': { getTransport },
    '../../../validation': { validateFields }
  })

  before(async () => {
    await setSeatHeater(payload)
  })

  it('called validateFields', () => {
    expect(validateFields).to.have.been.calledOnceWith(payload, validation)
  })

  it('called getTransport with the token', () => {
    expect(getTransport).to.have.been.calledOnceWith({ token })
  })

  it('called post with the correct path and payload', () => {
    expect(post).to.have.been.calledOnceWith(path, { heater, level })
  })
})
