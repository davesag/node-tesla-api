const genericAuthenticatedPost = require('../../../utils/genericAuthenticatedPost')

/**
 *  https://tesla-api.timdorr.com/vehicle/commands/media#post-api-1-vehicles-id-command-media_next_fav
 *
 *  @param {Object} — with keys `token`, and `id`.
 *  @returns {Object} — api response object as per docs, but with camelCase keys.
 */
const mediaNextFav = genericAuthenticatedPost('command/media_next_fav')

module.exports = mediaNextFav
