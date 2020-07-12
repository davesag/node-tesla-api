const genericAuthenticatedPost = require('../../../utils/genericAuthenticatedPost')

const chargeStandard = genericAuthenticatedPost('command/charge_standard')

module.exports = chargeStandard
