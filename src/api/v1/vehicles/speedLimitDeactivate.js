const genericAuthenticatedPost = require('../../../utils/genericAuthenticatedPost')

const speedLimitDeactivate = genericAuthenticatedPost('command/speed_limit_deactivate')

module.exports = speedLimitDeactivate
