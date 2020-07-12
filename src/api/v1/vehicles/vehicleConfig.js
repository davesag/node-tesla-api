const genericAuthenticatedGet = require('../../../utils/genericAuthenticatedGet')

/**
 *  https://tesla-api.timdorr.com/vehicle/state/vehicleconfig
 *
 *  @param {Object} — with keys `token`, and `id`.
 *  @returns {Object} — api response object as per docs, but with camelCase keys.
 */
const vehicleConfig = genericAuthenticatedGet('data_request/vehicle_config')

module.exports = vehicleConfig
