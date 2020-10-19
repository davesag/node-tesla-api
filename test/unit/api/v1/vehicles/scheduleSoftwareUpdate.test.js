/* eslint-disable camelcase */
const { expect } = require('chai')
const { spy, stub, resetHistory } = require('sinon')
const proxyquire = require('proxyquire')

describe('src/api/v1/vehicles/scheduleSoftwareUpdate', () => {
  const result = ['hooray']
  const post = stub().resolves({ result })
  const getTransport = stub().returns({ post })

  const validateFields = spy()

  const token = 'some token'
  const id = 'some id'
  const offset = 3600

  const validation = {
    token: ['isRequired'],
    id: ['isRequired'],
    offset: ['isRequired']
  }

  const path = `/api/1/vehicles/${id}/command/schedule_software_update`

  const scheduleSoftwareUpdate = proxyquire(
    '../../../../../src/api/v1/vehicles/scheduleSoftwareUpdate',
    {
      '../../../utils/transport': { getTransport },
      '../../../validation': { validateFields }
    }
  )

  context('when an offset is provided', () => {
    const payload = { token, id, offset }

    before(async () => {
      await scheduleSoftwareUpdate(payload)
    })

    after(resetHistory)

    it('called validateFields', () => {
      expect(validateFields).to.have.been.calledOnceWith({ id, token, offset }, validation)
    })

    it('called getTransport with the token', () => {
      expect(getTransport).to.have.been.calledOnceWith({ token })
    })

    it('called post with the correct path and payload', () => {
      expect(post).to.have.been.calledOnceWith(path, { offset_sec: offset })
    })
  })

  context('when an offset is not provided', () => {
    const payload = { token, id }

    before(async () => {
      await scheduleSoftwareUpdate(payload)
    })

    after(resetHistory)

    it('called validateFields', () => {
      expect(validateFields).to.have.been.calledOnceWith({ id, token, offset: 0 }, validation)
    })

    it('called getTransport with the token', () => {
      expect(getTransport).to.have.been.calledOnceWith({ token })
    })

    it('called post with the correct path and payload', () => {
      expect(post).to.have.been.calledOnceWith(path, { offset_sec: 0 })
    })
  })
})
