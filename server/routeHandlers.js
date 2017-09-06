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
      trainer: user.toClientDto(),
    })
  })
}

var fetchTrainersHandler = (req, res) => {
  User.fetchAll((err, users) => {
    if (err || !users)
      return res.status(500).json({ message: 'Error! Could not fetch trainers.' })

    res.json({
      trainers: users,
    })
  })
}

var createTrainerHandler = (req, res) => {
  User.createNewUser(req.body, (err, user) => {
    if (err || !user)
      return res.status(500).json({ message: 'Error! Could not create trainer.' })

    res.json({
      trainer: user.toClientDto(),
    })
  })
}

var deleteTrainerHandler = (req, res) => {
  User.deleteUser(req.params.id, (err, user) => {
    if (err || !user)
      return res.status(500).json({ message: 'Error! Could not delete trainer.' })

    res.json({
      message: 'Trainer successfully deleted',
      trainerId: user._id,
    })
  })
}

var ensureTrainer = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    var message
    if (err || !user) {
      message = 'Error! That trainer does not exist.'
    } else if (user.status == Lookups.Status.VERIFIED.key) {
      message = 'Error! That trainer is already verified.'
    } else if (user.status == Lookups.Status.DISABLED.key) {
      message = 'Error! That trainer is disabled.'
    }

    if (message) {
      return res.status(500).json({ message })
    }

    res.json({
      trainer: user.toClientDto(),
    })
  })
}

var verifyTrainer = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err || !user || !req.body.password)
      return res.stats(500).json({ message: 'Error! Could not verify user.' })

    // update user
    user.password = req.body.password
    user.status = Lookups.Status.VERIFIED.key
    user.lastUpdated = new Date()

    user.save((err, user) => {
      if (err || !user)
        return res.stats(500).json({ message: 'Error! Could not save the user changes.' })

      res.json({
        trainer: user.toClientDto(),
      })
    })
  })
}

module.exports = {
  loginHandler,
  fetchTrainersHandler,
  createTrainerHandler,
  deleteTrainerHandler,
  ensureTrainer,
  verifyTrainer,
}