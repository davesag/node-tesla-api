const genericAuthenticatedPost = require('../../../utils/genericAuthenticatedPost')

const chargePortDoorOpen = genericAuthenticatedPost(
  'command/charge_port_door_open'
)

module.exports = chargePortDoorOpen
