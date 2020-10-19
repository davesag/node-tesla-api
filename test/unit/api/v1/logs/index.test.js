const makeExistenceTest = require('../../../../helpers/makeExistenceTest')
const logs = require('../../../../../src/api/v1/logs/index')

describe('src/api/v1/logs/index', () => {
  ;['getEntitlements', 'sendEntitlements', 'getLogs'].forEach(makeExistenceTest(logs, 'function'))
})
