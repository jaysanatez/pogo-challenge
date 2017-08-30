var mongoose = require('mongoose')
var bcrypt   = require('bcrypt-nodejs')
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
  	data: Date,
  }],
})

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// can't user => syntax - this keyword throws error
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.methods.toClientDto = function() {
  return {
    username: this.username,
    role: this.role,
    status: this.status,
    lastUpdated: this.lastUpdated,
    team: this.team,
    xpUpdates: this.xpUpdates,
  }
}

var model = mongoose.model('User', userSchema)

var fetchAll = (next) => {
  model.find({}, 'username role status lastUpdated team xpUpdates', next)
}

var findById = (id, next) => {
  model.findById(id, next)
}

var findByName = (username, next) => {
  model.findOne({ username }, next)
}

module.exports = {
  model,
  fetchAll,
  findById,
  findByName,
}
