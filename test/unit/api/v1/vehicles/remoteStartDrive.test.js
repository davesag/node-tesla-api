/* eslint-disable camelcase */
const { expect } = require('chai')
const { spy, stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('src/api/v1/vehicles/remoteStartDrive', () => {
  const result = ['hooray']
  const post = stub().resolves({ result })
  const getTransport = stub().returns({ post })

  const validateFields = spy()

  const token = 'some token'
  const id = 'some id'
  const password = 1234

  const payload = { token, id, password }
  const validation = {
    token: ['isRequired'],
    id: ['isRequired'],
    password: ['isRequired']
  }

  const path = `/api/1/vehicles/${id}/command/remote_start_drive`

  const remoteStartDrive = proxyquire('../../../../../src/api/v1/vehicles/remoteStartDrive', {
    '../../../utils/transport': { getTransport },
    '../../../validation': { validateFields }
  })

  before(async () => {
    await remoteStartDrive(payload)
  })

  it('called validateFields', () => {
    expect(validateFields).to.have.been.calledOnceWith({ id, token, password }, validation)
  })

  it('called getTransport with the token', () => {
    expect(getTransport).to.have.been.calledOnceWith({ token })
  })

  it('called post with the correct path and payload', () => {
    expect(post).to.have.been.calledOnceWith(path, { password })
  })
})
