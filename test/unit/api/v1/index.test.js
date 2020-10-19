const makeExistenceTest = require('../../../helpers/makeExistenceTest')
const v1 = require('../../../../src/api/v1/index')

describe('src/api/v1/index', () => {
  ;['oauth', 'vehicles', 'logs'].forEach(makeExistenceTest(v1, 'object'))
})
