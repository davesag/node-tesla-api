/* eslint-disable camelcase */
const { expect } = require('chai')
const { spy, stub, resetHistory } = require('sinon')
const proxyquire = require('proxyquire')

describe('src/api/v1/vehicles/sunRoofControl', () => {
  const result = ['hooray']
  const post = stub().resolves({ result })
  const getTransport = stub().returns({ post })

  const validateFields = spy()

  const token = 'some token'
  const id = 'some id'

  const state = 'vent'
  const payload = { token, id, state }

  const validation = {
    token: ['isRequired'],
    id: ['isRequired'],
    state: ['isRequired']
  }

  const path = `/api/1/vehicles/${id}/command/sun_roof_control`

  const sunRoofControl = proxyquire('../../../../../src/api/v1/vehicles/sunRoofControl', {
    '../../../utils/transport': { getTransport },
    '../../../validation': { validateFields }
  })

  before(async () => {
    await sunRoofControl(payload)
  })

  after(resetHistory)

  it('called validateFields', () => {
    expect(validateFields).to.have.been.calledOnceWith({ id, token, state }, validation)
  })

  it('called getTransport with the token', () => {
    expect(getTransport).to.have.been.calledOnceWith({ token })
  })

  it('called post with the correct path and payload', () => {
    expect(post).to.have.been.calledOnceWith(path, { state })
  })
})
