const genericAuthenticatedPost = require('../../../utils/genericAuthenticatedPost')

/**
 *  https://tesla-api.timdorr.com/vehicle/commands/alerts
 *
 *  @param {Object} — with keys `token`, and `id`.
 *  @returns {Object} — api response object as per docs, but with camelCase keys.
 */
const flashLights = genericAuthenticatedPost('command/flash_lights')

module.exports = flashLights
