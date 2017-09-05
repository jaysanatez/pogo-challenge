var User     = require('./models/user')
var Lookups  = require('./lookups')
var auth     = require('./auth')

var loginHandler = (req, res) => {
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

    if (user.status != Lookups.Status.VERIFIED.key) {
      return res.status(401).json({ message: statusMessages[user.status] })
    }

    // we got ourselves a login
    res.json({
      message: 'Signed in',
      token: auth.getTokenForUser(user),
      user: user.toClientDto(),
    })
  })
}

var fetchTrainersHandler = (req, res) => {
  User.fetchAll((err, users) => {
    if (err || !users) {
      return res.status(500).json({ message: 'Error! Could not fetch trainers.' })
    }

    res.json({ users })
  })
}

module.exports = {
  loginHandler,
  fetchTrainersHandler,
}