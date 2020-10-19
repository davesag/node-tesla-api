/* eslint-disable camelcase */
const { expect } = require('chai')
const { spy, stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('src/api/v1/vehicles/setChargeLimit', () => {
  const result = ['hooray']
  const post = stub().resolves({ result })
  const getTransport = stub().returns({ post })

  const validateFields = spy()

  const token = 'some token'
  const id = 'some id'
  const percent = 'front'

  const payload = { token, id, percent }
  const validation = {
    token: ['isRequired'],
    id: ['isRequired'],
    percent: ['isRequired']
  }

  const path = `/api/1/vehicles/${id}/command/set_charge_limit`

  const setChargeLimit = proxyquire('../../../../../src/api/v1/vehicles/setChargeLimit', {
    '../../../utils/transport': { getTransport },
    '../../../validation': { validateFields }
  })

  before(async () => {
    await setChargeLimit(payload)
  })

  it('called validateFields', () => {
    expect(validateFields).to.have.been.calledOnceWith({ id, token, percent }, validation)
  })

  it('called getTransport with the token', () => {
    expect(getTransport).to.have.been.calledOnceWith({ token })
  })

  it('called post with the correct path and payload', () => {
    expect(post).to.have.been.calledOnceWith(path, { percent })
  })
})
