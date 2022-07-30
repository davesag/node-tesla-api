/* eslint-disable camelcase */
const { expect } = require('chai')
const { spy, stub, resetHistory, match } = require('sinon')
const proxyquire = require('proxyquire')

describe('src/api/v1/vehicles/share', () => {
  const result = ['hooray']
  const post = stub().resolves({ result })
  const getTransport = stub().returns({ post })
  const readOsLocale = stub()

  const validateFields = spy()

  const token = 'some token'
  const id = 'some id'
  const value = 'some excellent address or video link'

  const validation = {
    token: ['isRequired'],
    id: ['isRequired'],
    value: ['isRequired'],
    locale: ['isRequired']
  }

  const locale = 'en-AU'
  const path = `/api/1/vehicles/${id}/command/share`

  const share = proxyquire('../../../../../src/api/v1/vehicles/share', {
    '../../../utils/transport': { getTransport },
    '../../../validation': { validateFields },
    '../../../utils/readOsLocale': readOsLocale
  })

  context('given a locale', () => {
    const payload = { token, id, value, locale }

    before(async () => {
      await share(payload)
    })

    after(resetHistory)

    it('called validateFields', () => {
      expect(validateFields).to.have.been.calledOnceWith({ id, token, value, locale }, validation)
    })

    it('called getTransport with the token', () => {
      expect(getTransport).to.have.been.calledOnceWith({ token })
    })

    it('called post with the correct path and payload', () => {
      expect(post).to.have.been.calledOnceWith(path, {
        type: 'share_ext_content_raw',
        locale,
        timestamp_ms: match.number,
        value: {
          'android.intent.extra.TEXT': value
        }
      })
    })
  })

  context('without a locale', () => {
    const payload = { token, id, value }

    before(async () => {
      readOsLocale.resolves(locale)
      await share(payload)
    })

    after(resetHistory)

    it('called readOsLocale', () => {
      expect(readOsLocale).to.have.been.calledOnce
    })

    it('called validateFields', () => {
      expect(validateFields).to.have.been.calledOnceWith(
        { id, token, value, locale: match.string },
        validation
      )
    })

    it('called getTransport with the token', () => {
      expect(getTransport).to.have.been.calledOnceWith({ token })
    })

    it('called post with the correct path and payload', () => {
      expect(post).to.have.been.calledOnceWith(path, {
        type: 'share_ext_content_raw',
        locale,
        timestamp_ms: match.number,
        value: {
          'android.intent.extra.TEXT': value
        }
      })
    })
  })
})
