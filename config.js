const getConfigValue = str => {
  var val = process.env[str]
  if (!val) {
    console.log('No value found for key \'' + str + '\'')
  }

  return val
}

module.exports = {
  getConfigValue,
}
