var mongoose = require('mongoose')
var dbConfig = require('../config')

var connect = () => {
  mongoose.Promise = global.Promise
  mongoose.connect(dbConfig.connectionString, {
    useMongoClient: true,
  }).then().catch(err => {
    console.error(err)
  })
}

module.exports = {
  connect,
}
