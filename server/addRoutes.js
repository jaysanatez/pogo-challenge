var passport      = require('passport')
var path          = require('path')
var passport      = require('passport')

var auth          = require('./auth')
var Lookups       = require('../shared/lookups')
var routeHandlers = require('./routeHandlers')

module.exports = app => {

  // secured routes
  const authFunc = passport.authenticate('jwt', { session: false })

  app.get('/api/trainers', authFunc, routeHandlers.fetchTrainersHandler)
  app.post('/api/trainers', authFunc, auth.authenticateRoles([Lookups.Role.ADMIN]), routeHandlers.createTrainerHandler)
  app.delete('/api/trainers/:id', authFunc, auth.authenticateRoles([Lookups.Role.ADMIN]), routeHandlers.deleteTrainerHandler)
  app.get('/api/trainers/current', authFunc, routeHandlers.fetchCurrentTrainerHandler)
  app.post('/api/trainers/pokedex', authFunc, routeHandlers.addPokedexHandler)
  app.post('/api/trainers/xpupdates', authFunc, routeHandlers.updateXPHandler)
  app.post('/api/trainers/catches', authFunc, routeHandlers.createCatchHandler)

  // public routes
  app.post('/api/login', routeHandlers.loginHandler)
  app.get('/api/trainers/:id', routeHandlers.fetchTrainerHandler)
  app.post('/api/trainers/:id/verify', routeHandlers.verifyTrainer)

  // fall through all api routes, send everything else to the app route handling
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('index.html'))
  })
}
