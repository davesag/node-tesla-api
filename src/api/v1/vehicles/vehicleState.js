const genericAuthenticatedGet = require('../../../utils/genericAuthenticatedGet')

/**
 *  https://tesla-api.timdorr.com/vehicle/state/vehiclestate
 *
 *  @param {Object} — with keys `token`, and `id`.
 *  @returns {Object} — api response object as per docs, but with camelCase keys.
 */
const vehicleState = genericAuthenticatedGet('data_request/vehicle_state')

module.exports = vehicleState
