/* eslint-disable camelcase */
const { expect } = require('chai')
const { spy, stub, resetHistory } = require('sinon')
const proxyquire = require('proxyquire')

describe('src/api/v1/vehicles/windowControl', () => {
  const result = ['hooray']
  const post = stub().resolves({ result })
  const getTransport = stub().returns({ post })

  const validateFields = spy()

  const token = 'some token'
  const id = 'some id'

  const validation = {
    token: ['isRequired'],
    id: ['isRequired'],
    command: ['isRequired'], // TODO: add oneOf(['vent', 'close'])
    lat: ['isRequired'], // TODO: add numeric, positive
    lon: ['isRequired']
  }

  const path = `/api/1/vehicles/${id}/command/window_control`

  const windowControl = proxyquire('../../../../../src/api/v1/vehicles/windowControl', {
    '../../../utils/transport': { getTransport },
    '../../../validation': { validateFields }
  })

  context('venting', () => {
    const command = 'vent'
    const payload = { token, id, command }

    before(async () => {
      await windowControl(payload)
    })

    after(resetHistory)

    it('called validateFields', () => {
      expect(validateFields).to.have.been.calledOnceWith(
        { id, token, command, lat: 0, lon: 0 },
        validation
      )
    })

    it('called getTransport with the token', () => {
      expect(getTransport).to.have.been.calledOnceWith({ token })
    })

    it('called post with the correct path and payload', () => {
      expect(post).to.have.been.calledOnceWith(path, { command, lat: 0, lon: 0 })
    })
  })

  context('opening', () => {
    const command = 'open'
    const lat = -35.12345
    const lon = 155.12345

    const payload = { token, id, command, lat, lon }

    before(async () => {
      await windowControl(payload)
    })

    after(resetHistory)

    it('called validateFields', () => {
      expect(validateFields).to.have.been.calledOnceWith(
        { id, token, command, lat, lon },
        validation
      )
    })

    it('called getTransport with the token', () => {
      expect(getTransport).to.have.been.calledOnceWith({ token })
    })

    it('called post with the correct path and payload', () => {
      expect(post).to.have.been.calledOnceWith(path, { command, lat, lon })
    })
  })
})
