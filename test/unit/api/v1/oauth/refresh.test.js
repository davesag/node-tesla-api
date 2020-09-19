/* eslint-disable camelcase */
const { expect } = require('chai')
const { spy, stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('src/api/v1/oauth/refresh', () => {
  const result = 'hooray'
  const post = stub().resolves(result)
  const getTransport = stub().returns({ post })

  const validateFields = spy()

  const refresh_token = 'some awesome refresh token'
  const client_secret = 'some client secret'
  const client_id = 'some client id'

  const payload = { refresh_token, client_secret, client_id, grant_type: 'refresh_token' }
  const validation = {
    client_id: ['isRequired'],
    client_secret: ['isRequired'],
    refresh_token: ['isRequired']
  }

  const path = '/oauth/token'

  const refresh = proxyquire('../../../../../src/api/v1/oauth/refresh', {
    '../../../utils/transport': { getTransport },
    '../../../validation': { validateFields }
  })

  before(async () => {
    await refresh({
      refreshToken: refresh_token,
      clientSecret: client_secret,
      clientId: client_id
    })
  })

  it('called validateFields', () => {
    expect(validateFields).to.have.been.calledOnceWith(payload, validation)
  })

  it('called getTransport', () => {
    expect(getTransport).to.have.been.calledOnce
  })

  it('called post with the correct parameters', () => {
    expect(post).to.have.been.calledOnceWith(path, payload)
  })
})
