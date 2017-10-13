var passport    = require('passport')
var passportJwt = require('passport-jwt')
var jwt         = require('jsonwebtoken')
var config      = require('../shared/config')
var User        = require('./user')

var ExtractJwt  = passportJwt.ExtractJwt
var JwtStrategy = passportJwt.Strategy

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = config.getConfigValue('JWT_SECRET')

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

var authenticateRoles = roles => {
  return (req, res, next) => {
    // if user role isn't in the allowed roles, 401
    if (roles.indexOf(req.user.role) == -1) {
      return res.status(401).json({ message: 'Error! Invalid role to perform this operation.' })
    }

    next()
  }
}

module.exports = {
  jwtOptions,
  addAuth,
  getTokenForUser,
  authenticateRoles,
}
