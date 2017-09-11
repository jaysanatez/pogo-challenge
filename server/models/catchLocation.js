var mongoose = require('mongoose')
var moment   = require('moment')
var utils    = require('../../shared/utils')

var Schema   = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var catchSchema = new Schema({
  userId: ObjectId,
  pokemonId: Number,
  date: Date,
  locationName: String,
  cord: {
  	lat: Number,
  	lng: Number,
  },
})

var model = mongoose.model('Catches', catchSchema)

var createCatch = (data, user, next) => {
  var newCatch = new model()
  Object.assign(newUser, data)

  newCatch.userId = user._id
  newCatch.date = Moment(data.date, utils.LONG_DATE_STRING)

  newCatch.save(next)
}

module.exports = {
  createCatch,
}
