const genericAuthenticatedPost = require('../../../utils/genericAuthenticatedPost')

const autoConditioningStop = genericAuthenticatedPost(
  'command/auto_conditioning_stop'
)

module.exports = autoConditioningStop
