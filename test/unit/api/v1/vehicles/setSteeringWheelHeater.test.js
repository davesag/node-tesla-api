/* eslint-disable camelcase */
const { expect } = require('chai')
const { spy, stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('src/api/v1/vehicles/setSteeringWheelHeater', () => {
  const result = ['hooray']
  const post = stub().resolves({ result })
  const getTransport = stub().returns({ post })

  const validateFields = spy()

  const token = 'some token'
  const id = 'some id'
  const on = true

  const payload = { token, id, on }
  const validation = {
    token: ['isRequired'],
    id: ['isRequired'],
    on: ['isRequired']
  }

  const path = `/api/1/vehicles/${id}/command/remote_steering_wheel_heater_request`

  const setSteeringWheelHeater = proxyquire(
    '../../../../../src/api/v1/vehicles/setSteeringWheelHeater',
    {
      '../../../utils/transport': { getTransport },
      '../../../validation': { validateFields }
    }
  )

  before(async () => {
    await setSteeringWheelHeater(payload)
  })

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
