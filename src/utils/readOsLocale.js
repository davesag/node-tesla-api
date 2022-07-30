/* istanbul ignore next */
const readOsLocale = async () => {
  const { default: osLocale } = await import('os-locale')
  return osLocale({ spawn: false })
}

module.exports = readOsLocale
