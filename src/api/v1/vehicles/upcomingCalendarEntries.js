const genericAuthenticatedPost = require('../../../utils/genericAuthenticatedPost')

const upcomingCalendarEntries = genericAuthenticatedPost(
  'command/upcoming_calendar_entries'
)

module.exports = upcomingCalendarEntries
