var mongoose = require('mongoose')
var Moment   = require('moment')
var utils    = require('../../shared/utils')
var geocoder = require('../geocoder')

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
  if (!data.location || !data.location.name || !data.date ||
    !data.pokemonId || data.pokemonId < 0 || data.pokemonId > 251) {
    next('Error! Insufficient data provided.', null)
    return
  }

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

    newCatch.save(next)
  } else {
    var callback = (err, _catch) => {
      if (err) {
        next(err, null)
        return
      }

      if (!_catch) {
        next('Error! The catch could not be saved.', null)
        return
      }

      _catch.save(next)
    }

    geocoder.getCoordinates(newCatch, callback)
  }
}

module.exports = {
  fetchAll,
  createCatch,
}
