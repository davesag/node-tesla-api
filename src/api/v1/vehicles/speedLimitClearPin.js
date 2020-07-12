const genericAuthenticatedPost = require('../../../utils/genericAuthenticatedPost')

const speedLimitClearPin = genericAuthenticatedPost(
  'command/speed_limit_clear_pin'
)

module.exports = speedLimitClearPin
