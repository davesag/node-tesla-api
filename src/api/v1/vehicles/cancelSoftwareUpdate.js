const genericAuthenticatedPost = require('../../../utils/genericAuthenticatedPost')

const cancelSoftwareUpdate = genericAuthenticatedPost('command/cancel_software_update')

module.exports = cancelSoftwareUpdate
