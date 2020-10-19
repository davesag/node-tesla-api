const genericAuthenticatedGet = require('../../../utils/genericAuthenticatedGet')

/**
 *  https://tesla-api.timdorr.com/vehicle/state/chargestate
 *
 *  @param {Object} — with keys `id` and `token`
 *  @returns {Object} — api response object as per docs, but with camelCase keys.
 */
const chargeState = genericAuthenticatedGet('data_request/charge_state')

module.exports = chargeState
