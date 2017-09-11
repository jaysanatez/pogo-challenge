var passport      = require('passport')
var path          = require('path')
var passport      = require('passport')
var auth          = require('./auth')
var routeHandlers = require('./routeHandlers')
var Lookups       = require('../shared/lookups')

module.exports = app => {

  // secured routes
  const authFunc = passport.authenticate('jwt', { session: false })
  app.get('/api/trainers', authFunc, auth.authenticateRoles([Lookups.Role.ADMIN]), routeHandlers.fetchTrainersHandler)
  app.post('/api/trainers', authFunc, auth.authenticateRoles([Lookups.Role.ADMIN]), routeHandlers.createTrainerHandler)
  app.delete('/api/trainers/:id', authFunc, auth.authenticateRoles([Lookups.Role.ADMIN]), routeHandlers.deleteTrainerHandler)
  app.post('/api/xp/update', authFunc, routeHandlers.updateXPHandler)
  app.get('/api/trainers/current', authFunc, routeHandlers.fetchCurrentTrainerHandler)

  // public routes
  app.post('/api/login', routeHandlers.loginHandler)
  app.get('/api/trainers/:id', routeHandlers.fetchTrainerHandler)
  app.post('/api/trainers/:id/verify', routeHandlers.verifyTrainer)

  // fall through all api routes, send everything else to the app route handling
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('index.html'))
  })
}
