const genericAuthenticatedGet = require('../../../utils/genericAuthenticatedGet')

/**
 *  https://tesla-api.timdorr.com/vehicle/state/nearbychargingsites
 *
 *  @param {Object} — with keys `token`, and `id`.
 *  @returns {Object} — api response object as per docs, but with camelCase keys.
 */
const nearbyChargingSites = genericAuthenticatedGet('nearby_charging_sites')

module.exports = nearbyChargingSites
