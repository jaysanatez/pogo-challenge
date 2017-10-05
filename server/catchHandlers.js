var Catch   = require('./models/catch')

var fetchAllCatchesHandler = (req, res) => {
  Catch.fetchAll((err, catches) => {
    if (err || !catches)
      return res.status(500).json({ message: 'Error! Could not fetch catches.' })

    res.json({
      catches,
    })
  })
}

var createCatchHandler = (req, res) => {
  Catch.createCatch(req.body, req.user._id, (err, catchLoc) => {
    if (err || !catchLoc)
      return res.status(500).json({ message: (err || 'Error! Could not create catch.') })

    res.json({
      catch: catchLoc,
    })
  })
}

module.exports = {
  fetchAllCatchesHandler,
  createCatchHandler,
}
