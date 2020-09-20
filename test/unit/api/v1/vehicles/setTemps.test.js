/* eslint-disable camelcase */
const { expect } = require('chai')
const { spy, stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('src/api/v1/vehicles/setTemps', () => {
  const result = ['hooray']
  const post = stub().resolves(result)
  const getTransport = stub().returns({ post })

  const validateFields = spy()

  const token = 'some token'
  const id = 'some id'
  const driverTemp = 22.5

  const payload = { token, id, driverTemp }
  const validation = {
    token: ['isRequired'],
    id: ['isRequired'],
    driver_temp: ['isRequired']
  }

  const path = `/api/1/vehicles/${id}/command/set_temps`

  const setTemps = proxyquire('../../../../../src/api/v1/vehicles/setTemps', {
    '../../../utils/transport': { getTransport },
    '../../../validation': { validateFields }
  })

  before(async () => {
    await setTemps(payload)
  })

  it('called validateFields', () => {
    expect(validateFields).to.have.been.calledOnceWith(
      { id, token, driver_temp: driverTemp, passenger_temp: driverTemp },
      validation
    )
  })

  it('called getTransport with the token', () => {
    expect(getTransport).to.have.been.calledOnceWith({ token })
  })

  it('called post with the correct path and payload', () => {
    expect(post).to.have.been.calledOnceWith(path, {
      driver_temp: driverTemp,
      passenger_temp: driverTemp
    })
  })
})
