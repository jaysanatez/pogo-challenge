import Moment from 'moment'
import toPercentage from 'to-percentage'

import {
  LONG_DATE_STRING,
  minXPForLevel,
  getLevelForXP,
} from '../../../shared/utils'

function calcXpTilNextLevel(xp) {
  const level = parseInt(getLevelForXP(xp))
  const nextLevel = level + 1
  const currentLevelXp = minXPForLevel[level]
  const rawPercent = (xp - currentLevelXp) / (minXPForLevel[nextLevel] - currentLevelXp)

  return {
    nextLevel,
    xpTilNextLevel: minXPForLevel[nextLevel] - xp,
    percentTowardsNextLevel: toPercentage(rawPercent, 1)
  }
}

export function calculateLevelUpData(updates, lastN) {
  updates.sort((u1, u2) => {
    return new Date(u1.date) - new Date(u2.date)
  })

  const createDate = date => Moment(new Date(date))

  const num = Math.min(lastN, updates.length)
  const lastNUpdates = updates.slice(updates.length - num)

  const update0 = lastNUpdates[0]
  const updateN = lastNUpdates[num - 1]
  const dateN = createDate(updateN.date)
  const daysBetween = dateN.diff(createDate(update0.date), 'days')

  const dailyAvg = parseInt((updateN.value - update0.value) / daysBetween)
  const { nextLevel, xpTilNextLevel, percentTowardsNextLevel } = calcXpTilNextLevel(lastNUpdates[num - 1].value)
  const daysSinceLastUpdate = Moment().diff(dateN, 'days')
  const daysTilNextLevel =  Math.ceil(xpTilNextLevel / dailyAvg) - daysSinceLastUpdate
  const projectedLevelUpDate = Moment().add(daysTilNextLevel, 'days').format(LONG_DATE_STRING)

  return {
    dailyAvg,
    nextLevel,
    xpTilNextLevel,
    daysTilNextLevel,
    projectedLevelUpDate,
    percentTowardsNextLevel,
  }
}
