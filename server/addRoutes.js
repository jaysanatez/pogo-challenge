var passport = require('passport')
var path     = require('path')
var auth     = require('./auth')
var User     = require('./models/user')

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
