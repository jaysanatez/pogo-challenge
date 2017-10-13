var mongoose = require('mongoose')
var bcrypt   = require('bcrypt-nodejs')
var Moment   = require('moment')

var Lookups  = require('../shared/lookups')
var Schema   = mongoose.Schema

var userSchema = new Schema({
  username: {
  	type: String,
  	unique: true,
  },
  password: String,
  role: Number,
  status: Number,
  lastUpdated: Date,
  team: Number,
  xpUpdates: [{
  	value: Number,
  	date: String,
  }],
  pokedex: [{
    pokemonId: Number,
    date: String,
  }],
  catches: [{
    pokemonId: Number,
    date: String,
    locationName: String,
    cord: {
      lat: Number,
      lng: Number,
    },
  }]
})

// can't use => syntax - this keyword throws error
userSchema.pre('save', function(next) {
  var user = this

  if (!user.isModified('password'))
    return next()

  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null)
  next()
})

// can't use => syntax - this keyword throws error
userSchema.methods.validatePassword = function(password) {
  if (!this.password) {
    return false
  }

  return bcrypt.compareSync(password, this.password)
}

userSchema.methods.toClientDto = function() {
  return {
    _id: this._id,
    username: this.username,
    role: this.role,
    status: this.status,
    lastUpdated: this.lastUpdated,
    team: this.team,
    xpUpdates: this.xpUpdates,
    pokedex: this.pokedex,
    catches: this.catches,
  }
}

var model = mongoose.model('User', userSchema)

var fetchAll = next => {
  model.find({}, 'username role status lastUpdated team xpUpdates pokedex catches', next)
}

var findById = (id, next) => {
  model.findById(id, next)
}

var findByName = (username, next) => {
  model.findOne({ username }, next)
}

var createNewUser = (data, next) => {
  var newUser = new model()
  Object.assign(newUser, data)

  newUser.lastUpdated = Moment.utc()
  newUser.status = Lookups.Status.CREATED
  newUser.xpUpdates = []
  newUser.pokedex = []
  newUser.catches = []

  newUser.save(next)
}

var deleteUser = (id, next) => {
  model.findByIdAndRemove(id, next)
}

module.exports = {
  fetchAll,
  findById,
  findByName,
  createNewUser,
  deleteUser,
}
