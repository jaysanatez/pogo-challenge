var Geocoder = require('node-geocoder')
var config   = require('../config')

const options = {
  provider: 'google',
  formatter: null,
  apiKey: config.googleMapsKey,
}

const geocoder = Geocoder(options)

var getCoordinates = (_catch, callback) => {
  geocoder.geocode(_catch.locationName, (err, res) => {
  	if (err || !res) {
  	  callback(err, null)
  	  return
  	}

  	if (!res.length) {
      callback('Error! The location given could not be located.', null)
      return
  	}

    const name = res[0].formattedAddress
    const lat = res[0].latitude
    const lng = res[0].longitude

    if (!name || !lat || !lng) {
      callback('Error! The location given could not be located.', null)
      return
    }

  	_catch.locationName = name
  	_catch.cord = {
  	  lat,
  	  lng,
  	}

  	callback(null, _catch)
  })
}

module.exports = {
  getCoordinates,
}