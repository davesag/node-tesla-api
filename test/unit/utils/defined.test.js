const { expect } = require('chai')

const defined = require('../../../src/utils/defined')

describe('utils/defined', () => {
  const doTest = ([label, value, fn, expected]) => {
    context(`when ${label}`, () => {
      if (expected === undefined) {
        it('returns undefined', () => {
          expect(defined(value, fn)).to.be.undefined
        })
      } else if (isNaN(expected)) {
        it('returns NaN', () => {
          expect(defined(value, fn)).to.be.NaN
        })
      } else {
        it(`returns ${expected}`, () => {
          expect(defined(value, fn)).to.equal(expected)
        })
      }
    })
  }

  ;[
    ['given NaN and no function', NaN, undefined, NaN],
    ['given undefined and no function'],
    ['given number 1 and function that adds 1', 1, n => n + 1, 2],
    ['given string "1" and function that doubles it', '1', s => `${s}${s}`, '11'],
    ['given false and no function', false, undefined, false]
  ].forEach(doTest)
})
