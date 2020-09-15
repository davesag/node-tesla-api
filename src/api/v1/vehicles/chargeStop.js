const genericAuthenticatedPost = require('../../../utils/genericAuthenticatedPost')

const chargeStop = genericAuthenticatedPost('command/charge_stop')

module.exports = chargeStop
