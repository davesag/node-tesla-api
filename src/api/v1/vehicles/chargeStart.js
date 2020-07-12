const genericAuthenticatedPost = require('../../../utils/genericAuthenticatedPost')

const chargeStart = genericAuthenticatedPost('command/charge_start')

module.exports = chargeStart
