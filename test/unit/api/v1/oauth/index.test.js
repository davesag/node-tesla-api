const makeExistenceTest = require('../../../../helpers/makeExistenceTest')
const oauth = require('../../../../../src/api/v1/oauth/index')

describe('src/api/v1/oauth/index', () => {
  ;['refresh', 'revoke', 'token'].forEach(makeExistenceTest(oauth, 'function'))
})
