/* eslint-disable camelcase */
const { expect } = require('chai')
const { spy, stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('src/api/v1/logs/getLogs', () => {
  const result = 'hooray'
  const post = stub().resolves(result)
  const getTransport = stub().returns({ post })

  const validateFields = spy()

  const token = 'some awesome token'

  const payload = { token }
  const validation = {
    token: ['isRequired']
  }

  const path = '/api/1/logs'

  const getLogs = proxyquire('../../../../../src/api/v1/logs/getLogs', {
    '../../../utils/transport': { getTransport },
    '../../../validation': { validateFields }
  })

  before(async () => {
    await getLogs({ token })
  })

  it('called validateFields', () => {
    expect(validateFields).to.have.been.calledOnceWith(payload, validation)
  })

  it('called getTransport', () => {
    expect(getTransport).to.have.been.calledOnce
  })

  it('called post with the correct parameters', () => {
    expect(post).to.have.been.calledOnceWith(path)
  })
})
