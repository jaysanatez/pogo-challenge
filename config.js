const tryLoadConfigJson = str => {
  try {
    var localConfig = require('./localConfig.json')
    return localConfig[str]
  } catch (e) {
    return null
  }
}

const getConfigValue = str => {
  const val = process.env[str] || tryLoadConfigJson(str)

  if (!val) {
    console.log('No value found for key \'' + str + '\'')
  }

  return val
}

module.exports = {
  getConfigValue,
}
