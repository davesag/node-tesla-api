/* eslint-disable camelcase */
const { expect } = require('chai')
const { spy, stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('src/api/v1/oauth/token', () => {
  const result = 'hooray'
  const post = stub().resolves(result)
  const getTransport = stub().returns({ post })

  const validateFields = spy()

  const email = 'some email'
  const password = 'some password'
  const client_secret = 'some client secret'
  const client_id = 'some client id'

  const payload = { email, password, client_secret, client_id, grant_type: 'password' }
  const validation = {
    email: ['isRequired'],
    password: ['isRequired'],
    client_secret: ['isRequired'],
    client_id: ['isRequired']
  }

  const path = '/oauth/token'

  const token = proxyquire('../../../../../src/api/v1/oauth/token', {
    '../../../utils/transport': { getTransport },
    '../../../validation': { validateFields }
  })

  before(async () => {
    await token({
      email,
      password,
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
