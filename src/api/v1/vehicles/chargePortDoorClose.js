const genericAuthenticatedPost = require('../../../utils/genericAuthenticatedPost')

const chargePortDoorClose = genericAuthenticatedPost(
  'command/charge_port_door_close'
)

module.exports = chargePortDoorClose
