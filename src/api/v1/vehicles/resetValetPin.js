const genericAuthenticatedPost = require('../../../utils/genericAuthenticatedPost')

const resetValetPin = genericAuthenticatedPost('command/reset_valet_pin')

module.exports = resetValetPin
