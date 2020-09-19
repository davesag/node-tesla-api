const genericAuthenticatedPost = require('../../../utils/genericAuthenticatedPost')

/**
 *  https://tesla-api.timdorr.com/vehicle/commands/wake
 *
 *  @param {Object} — with keys `token`, and `id`.
 *  @returns {Object} — api response object as per docs, but with camelCase keys.
 */
const wakeUp = genericAuthenticatedPost('wake_up')

module.exports = wakeUp
