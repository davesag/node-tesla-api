const genericAuthenticatedGet = require('../../../utils/genericAuthenticatedGet')

/**
 *  https://tesla-api.timdorr.com/vehicle/state/drivestate
 *
 *  @param {Object} — with keys `id` and `token`
 *  @returns {Object} — api reresponse object as per docs, but with camelCase keys.
 */
const driveState = genericAuthenticatedGet('data_request/drive_state')

module.exports = driveState
