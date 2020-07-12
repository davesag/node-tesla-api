const genericAuthenticatedGet = require('../../../utils/genericAuthenticatedGet')

/**
 *  https://tesla-api.timdorr.com/vehicle/state/climatestate
 *
 *  @param {Object} — with keys `id` and `token`
 *  @returns {Object} — api reresponse object as per docs, but with camelCase keys.
 */
const climateState = genericAuthenticatedGet('data_request/climate_state')

module.exports = climateState
