var mongoose = require('mongoose')
var config = require('../config')

var connect = () => {
  mongoose.Promise = global.Promise
  mongoose.connect(config.getConfigValue('connectionString'), {
    useMongoClient: true,
  }).then().catch(err => {
    console.error(err)
  })
}

module.exports = {
  connect,
}
