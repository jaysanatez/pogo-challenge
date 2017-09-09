var Moment = require('moment')
Moment.locale('en')

const DATE_TIME_STRING = 'MMM D, hh:mm a'
const DATE_STRING = 'MM/DD/YYYY'

function formatDate(date, str) {
  return Moment(date).format(str)
}

const minXpForLevel = {
  1: 0,
  2: 1000,
  3: 3000,
  4: 6000,
  5: 10000,
  6: 15000,
  7: 21000,
  8: 28000,
  9: 36000,
  10: 45000,
  11: 55000,
  12: 65000,
  13: 75000,
  14: 85000,
  15: 100000,
  16: 120000,
  17: 140000,
  18: 160000,
  19: 185000,
  20: 210000,
  21: 260000,
  22: 335000,
  23: 435000,
  24: 560000,
  25: 710000,
  26: 900000,
  27: 1100000,
  28: 1350000,
  29: 1650000,
  30: 2000000,
  31: 2500000,
  32: 3000000,
  33: 3750000,
  34: 4750000,
  35: 6000000,
  36: 7500000,
  37: 9500000,
  38: 12000000,
  39: 15000000,
  40: 20000000,
}

function getLatestXPUpdate(updates) {
  var xpUpdate
  updates.forEach(u => {
  	if (!xpUpdate || u.date > xpUpdate.date)
  	  xpUpdate = u
  })

  return xpUpdate
}

function getLevelForXP(xp) {
  var level = 1
  Object.keys(minXpForLevel).forEach(key => {
  	if (xp > minXpForLevel[key])
  	  level = key
  })

  return level
}

function getTrainerLevel(trainer) {
  const update = getLatestXPUpdate(trainer.xpUpdates)
  if (!update)
  	return '???'

  return getLevelForXP(update.value)
} 

module.exports = {
  formatDate,
  DATE_TIME_STRING,
  DATE_STRING,
  getLevelForXP,
  getTrainerLevel,
}
