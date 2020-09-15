const genericAuthenticatedPost = require('../../../utils/genericAuthenticatedPost')

const chargeMaxRange = genericAuthenticatedPost('command/charge_max_range')

module.exports = chargeMaxRange
