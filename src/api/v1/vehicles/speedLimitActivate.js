const genericAuthenticatedPost = require('../../../utils/genericAuthenticatedPost')

const speedLimitActivate = genericAuthenticatedPost(
  'command/speed_limit_activate'
)

module.exports = speedLimitActivate
