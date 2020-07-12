const { expect } = require('chai')
const { stub } = require('sinon')

const safeFn = require('../../../src/utils/safeFn')

describe('utils/safeFn', () => {
  const params = ['well', 'that', 'worked']
  const fn = stub()

  const resetStub = () => {
    fn.resetHistory()
  }

  context('given a function', () => {
    before(() => {
      safeFn(fn, ...params)
    })

    after(resetStub)

    it('called fn with params', () => {
      expect(fn).to.have.been.calledOnceWith(...params)
    })
  })

  context('given undefined', () => {
    before(() => {
      safeFn(undefined, ...params)
    })

    after(resetStub)

    it('did not call fn', () => {
      expect(fn).not.to.have.been.called
    })
  })

  context('given nonsense', () => {
    before(() => {
      safeFn('nonsense', ...params)
    })

    after(resetStub)

    it('did not call fn', () => {
      expect(fn).not.to.have.been.called
    })
  })
})
