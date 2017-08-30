var passport = require('passport')
var path     = require('path')
var auth     = require('./auth')
var User     = require('./models/user')
var Lookups  = require('./lookups')

module.exports = app => {
  // public routes

  app.post('/api/login', (req, res) => {
    var username = req.body.username
    var password = req.body.password
    
    User.findByName(username, (err, user) => {
      // no user found with that name
      if (err || !user) {
        return res.status(401).json({ message: 'Error! User does not exist.' })
      }

      // incorrect password
      if (!user.validatePassword(password)) {
        return res.status(401).json({ message: 'Error! Password did not match.' })
      }

      // invalid user status
      const statusMessages = {
        2: 'Error! User has not been verified.',
        3: 'Error! User is disabled.',
      }

      if (user.status != Lookups.Status.VERIFIED) {
        return res.status(401).json({ message: statusMessages[user.status] });
      }

      // we got ourselves a login
      res.json({
        message: 'Signed in',
        token: auth.getTokenForUser(user),
        user: user.toClientDto(),
      })
    })
  })

  // secured routes
  
  app.get('/api/trainers', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.fetchAll((err, users) => {
      if (err || !users) {
        return res.status(500).json({ message: 'Error! Could not fetch trainers.' })
      }

      res.json({ users })
    });
  })

  // fall through all api routes, send everything else to the app route handling
  app.get("*", (req,res) => {
    res.sendFile(path.resolve('index.html'))
  })
}
