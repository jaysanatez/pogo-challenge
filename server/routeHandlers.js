var Moment  = require('moment')

var User    = require('./models/user')
var Catch   = require('./models/catch')
var Lookups = require('../shared/lookups')
var auth    = require('./auth')
var utils   = require('../shared/utils')

const handleUserAuth = (user, res) => {
  // invalid user status
  const statusMessages = {
    2: 'Error! User has not been verified.',
    3: 'Error! User is disabled.',
  }

  if (user.status != Lookups.Status.VERIFIED) {
    return res.status(401).json({ message: statusMessages[user.status] })
  }

  // we got ourselves a login
  res.json({
    message: 'Signed in',
    token: auth.getTokenForUser(user),
    trainer: user.toClientDto(),
  })
}

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

    handleUserAuth(user, res)
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
      trainerId: user._id,
    })
  })
}

var fetchTrainerHandler = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err || !user)
      return res.status(500).json({ message: 'Error! Could not fetch trainer.' })

    res.json({
      trainer: user.toClientDto(),
    })
  })
}

var fetchCurrentTrainerHandler = (req, res) => {
  if(!req.user)
    return res.status(500).json({ message: 'Error! Could not fetch trainer.' })

  res.json({
    trainer: req.user.toClientDto(),
  })
}

var verifyTrainer = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err || !user || !req.body.password)
      return res.status(500).json({ message: 'Error! Could not verify user.' })

    // update user
    user.password = req.body.password
    user.status = Lookups.Status.VERIFIED
    user.lastUpdated = new Date()

    user.save((err, user) => {
      if (err || !user)
        return res.status(500).json({ message: 'Error! Could not save the user changes.' })
      
      // log user in after saving password
      handleUserAuth(user, res)
    })
  })
}

// corrupt cases:
//  1. the data is in the future
//  2. there is a previous update with greater xp
//  3. there is a future update with less xp
var verifyXpUpdate = (updates, update) => {
  if (Moment().diff(update.date, 'days') < 0)
    return 'Error! You cannot post updates for future dates.'

  var message
  updates.forEach(u => {
    // negative if update is more recent
    const dateDiff = Moment(u.date).diff(update.date, 'days')
    const valDiff = u.value - update.value

    // value will be negative if corrupt case 1 or 2 are true
    if (dateDiff * valDiff < 0)
      message = 'Error! XP must increase with time, this conflicts with your XP on ' + Moment(u.date).format(utils.SHORT_DATE_STRING)
  })

  return message
}

var updateWithSameDay = (updates, update) => {
  var date = null
  updates.forEach(u => {
    if (Moment(u.date).isSame(update.date))
      date = u
  })

  return date
}

var updateXPHandler = (req, res) => {
  User.findById(req.user._id, (err, user) => {
    if (err || !user)
      return res.status(500).json({ message: 'Error! Could not locate user.' })

    // verify the data is accurate (return null if nothing wrong)
    const update = req.body
    update.date = Moment(update.date, utils.LONG_DATE_STRING)

    const message = verifyXpUpdate(user.xpUpdates, update)
    if (message)
      return res.status(500).json({ message })

    // update object and save
    const existingUpdate = updateWithSameDay(user.xpUpdates, update)
    if (existingUpdate) {
      // replace existing with new
      user.xpUpdates = user.xpUpdates.map(u => {
        return u == existingUpdate ? update : u
      })
    } else {
      user.xpUpdates = user.xpUpdates.concat(req.body)
    }

    user.lastUpdated = new Date()
    user.save((err, user) => {
      if (err || !user)
        return res.status(500).json({ message: 'Error! Could not save the user changes.' })
      
      res.json({
        trainer: user.toClientDto(),
      })
    })
  })
}

var createCatchHandler = (req, res) => {
  Catch.createCatch(req.body, req.user._id, (err, catchLoc) => {
    if (err || !catchLoc)
      return res.status(500).json({ message: 'Error! Could not create catch.' })

    res.json({
      catch: catchLoc,
    })
  })
}

module.exports = {
  loginHandler,
  fetchTrainersHandler,
  createTrainerHandler,
  deleteTrainerHandler,
  fetchTrainerHandler,
  fetchCurrentTrainerHandler,
  verifyTrainer,
  updateXPHandler,
  createCatchHandler,
}