const genericAuthenticatedPost = require('../../../utils/genericAuthenticatedPost')

/**
 *  https://tesla-api.timdorr.com/vehicle/commands/media#post-api-1-vehicles-id-command-media_prev_fav
 *
 *  @param {Object} — with keys `token`, and `id`.
 *  @returns {Object} — api response object as per docs, but with camelCase keys.
 */
const mediaPrevFav = genericAuthenticatedPost('command/media_prev_fav')

module.exports = mediaPrevFav
