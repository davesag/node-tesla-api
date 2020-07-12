const genericAuthenticatedPost = require('../../../utils/genericAuthenticatedPost')

const speedLimitSetLimit = genericAuthenticatedPost(
  'command/speed_limit_set_limit'
)

module.exports = speedLimitSetLimit
