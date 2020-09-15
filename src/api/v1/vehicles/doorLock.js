const genericAuthenticatedPost = require('../../../utils/genericAuthenticatedPost')

const doorLock = genericAuthenticatedPost('command/door_lock')

module.exports = doorLock
