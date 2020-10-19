/* eslint-disable camelcase */
const { expect } = require('chai')
const { spy, stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('src/api/v1/vehicles/actuateTrunk', () => {
  const result = ['hooray']
  const post = stub().resolves({ result })
  const getTransport = stub().returns({ post })

  const validateFields = spy()

  const token = 'some token'
  const id = 'some id'
  const which = 'front'

  const payload = { token, id, which }
  const validation = {
    token: ['isRequired'],
    id: ['isRequired'],
    which: ['isRequired']
  }

  const path = `/api/1/vehicles/${id}/command/actuate_trunk`

  const actuateTrunk = proxyquire('../../../../../src/api/v1/vehicles/actuateTrunk', {
    '../../../utils/transport': { getTransport },
    '../../../validation': { validateFields }
  })

  before(async () => {
    await actuateTrunk(payload)
  })

  it('called validateFields', () => {
    expect(validateFields).to.have.been.calledOnceWith({ id, token, which }, validation)
  })

  it('called getTransport with the token', () => {
    expect(getTransport).to.have.been.calledOnceWith({ token })
  })

  it('called post with the correct path and payload', () => {
    expect(post).to.have.been.calledOnceWith(path, { which_trunk: which })
  })
})
