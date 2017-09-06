var passport      = require('passport')
var path          = require('path')
var passport      = require('passport')
var auth          = require('./auth')
var routeHandlers = require('./routeHandlers')
var Lookups       = require('./lookups')

module.exports = app => {
  // public routes
  app.post('/api/login', routeHandlers.loginHandler)

  // secured routes
  app.get('/api/trainers', passport.authenticate('jwt', { session: false }), auth.authenticateRoles([Lookups.Role.ADMIN.key]), routeHandlers.fetchTrainersHandler)
  app.post('/api/trainer', passport.authenticate('jwt', { session: false}), auth.authenticateRoles([Lookups.Role.ADMIN.key]), routeHandlers.createTrainerHandler)

  // fall through all api routes, send everything else to the app route handling
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('index.html'))
  })
}
