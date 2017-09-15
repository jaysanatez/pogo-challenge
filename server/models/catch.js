var mongoose = require('mongoose')
var Moment   = require('moment')
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

var fetchAll = next => {
  model.find({}, next)
}

var createCatch = (data, userId, next) => {
  var newCatch = new model()
  const loc = data.location

  newCatch.pokemonId = data.pokemonId
  newCatch.userId = userId
  newCatch.date = Moment(data.date, utils.LONG_DATE_STRING)
  newCatch.locationName = loc.name

  if (loc.lat && loc.lng) {
    newCatch.cord = {
      lat: loc.lat,
      lng: loc.lng,
    }
  } else {
    // get it from the geocoding service
  }

  newCatch.save(next)
}

module.exports = {
  fetchAll,
  createCatch,
}
