var passport    = require('passport')
var passportJwt = require('passport-jwt')
var jwt         = require('jsonwebtoken')
var config      = require('../config')
var User        = require('./models/user')

var ExtractJwt  = passportJwt.ExtractJwt
var JwtStrategy = passportJwt.Strategy

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = config.jwtSecret

var addAuth = app => {
  var strategy = new JwtStrategy(jwtOptions, (jwtPayload, next) => {
    User.findById(jwtPayload._id, (err, user) => {
      if (err) {
        return next(err)
      }

      return next(null, user || false)
    })
  })

  passport.use(strategy)
  app.use(passport.initialize())
}

var getTokenForUser = (user) => {
  var payload = { _id: user._id }
  return jwt.sign(payload, jwtOptions.secretOrKey) 
}

module.exports = {
  jwtOptions,
  addAuth,
  getTokenForUser,
}
