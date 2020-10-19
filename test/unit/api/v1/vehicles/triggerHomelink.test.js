/* eslint-disable camelcase */
const { expect } = require('chai')
const { spy, stub, resetHistory } = require('sinon')
const proxyquire = require('proxyquire')

describe('src/api/v1/vehicles/triggerHomelink', () => {
  const result = ['hooray']
  const post = stub().resolves({ result })
  const getTransport = stub().returns({ post })

  const validateFields = spy()

  const token = 'some token'
  const id = 'some id'

  const validation = {
    token: ['isRequired'],
    id: ['isRequired'],
    lat: ['isRequired'],
    lon: ['isRequired']
  }

  const path = `/api/1/vehicles/${id}/command/trigger_homelink`

  const triggerHomelink = proxyquire('../../../../../src/api/v1/vehicles/triggerHomelink', {
    '../../../utils/transport': { getTransport },
    '../../../validation': { validateFields }
  })

  const lat = -35.12345
  const lon = 155.12345

  const payload = { token, id, lat, lon }

  before(async () => {
    await triggerHomelink(payload)
  })

  after(resetHistory)

  it('called validateFields', () => {
    expect(validateFields).to.have.been.calledOnceWith({ id, token, lat, lon }, validation)
  })

  it('called getTransport with the token', () => {
    expect(getTransport).to.have.been.calledOnceWith({ token })
  })

  it('called post with the correct path and payload', () => {
    expect(post).to.have.been.calledOnceWith(path, { lat, lon })
  })
})
