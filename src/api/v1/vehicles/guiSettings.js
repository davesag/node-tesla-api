const genericAuthenticatedGet = require('../../../utils/genericAuthenticatedGet')

/**
 *  https://tesla-api.timdorr.com/vehicle/state/guisettings
 *
 *  @param {Object} — with keys `id` and `token`
 *  @returns {Object} — api reresponse object as per docs, but with camelCase keys.
 */
const guiSettings = genericAuthenticatedGet('data_request/gui_settings')

module.exports = guiSettings
