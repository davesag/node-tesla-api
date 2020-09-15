const { expect } = require('chai')

const fixKeys = require('../../../src/utils/fixKeys')

describe('utils/fixKeys', () => {
  let result
  context('when not given data', () => {
    before(() => {
      result = fixKeys()
    })

    it('returns undefined', () => {
      expect(result).to.be.undefined
    })
  })

  context('when given null', () => {
    before(() => {
      result = fixKeys(null)
    })

    it('returns null', () => {
      expect(result).to.be.null
    })
  })

  context('when given NaN', () => {
    before(() => {
      result = fixKeys(NaN)
    })

    it('returns NaN', () => {
      expect(result).to.be.NaN
    })
  })

  context('when given data', () => {
    const original = {
      some: 'data',
      with: {
        nested: 'data'
      },
      and: ['an', 'array', 'of', 'strings'],
      as_well_as: [{ an: 'array of objects' }]
    }

    const expected = {
      some: 'data',
      with: {
        nested: 'data'
      },
      and: ['an', 'array', 'of', 'strings'],
      asWellAs: [{ an: 'array of objects' }]
    }

    before(() => {
      result = fixKeys(original)
    })

    it('left the original untouched', () => {
      expect(original).not.to.deep.equal(expected)
    })

    it('fixed the keys', () => {
      expect(result).to.deep.equal(expected)
    })
  })
})
