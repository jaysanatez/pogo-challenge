var mongoose = require('mongoose')
var config = require('../shared/config')

var connect = () => {
  mongoose.Promise = global.Promise
  mongoose.connect(config.getConfigValue('CONNECTION_STRING'), {
    useMongoClient: true,
  }).then().catch(err => {
    console.error(err)
  })
}

module.exports = {
  connect,
}
