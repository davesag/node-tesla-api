const osLocale = require('os-locale')

const { getTransport } = require('../../../utils/transport')
const { validateFields } = require('../../../validation')

const validation = {
  token: ['isRequired'],
  id: ['isRequired'],
  value: ['isRequired'],
  locale: ['isRequired']
}

const share = async ({ token, id, value, locale: loc }) => {
  const locale = loc || (await osLocale({ spawn: false }))
  validateFields({ token, id, value, locale }, validation)

  const payload = {
    type: 'share_ext_content_raw',
    locale,
    timestamp_ms: new Date().getTime(),
    value: {
      // TODO: work out a cleaner way to do this.
      'android.intent.extra.TEXT': value
    }
  }
  const { post } = getTransport({ token })

  return post(`/api/1/vehicles/${id}/command/share`, payload)
}

module.exports = share
