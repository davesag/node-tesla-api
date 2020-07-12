const genericAuthenticatedPost = require('../../../utils/genericAuthenticatedPost')

const doorUnlock = genericAuthenticatedPost('command/door_unlock')

module.exports = doorUnlock
