import {
  minXPForLevel,
  getLevelForXP,
} from '../../shared/utils'

const MAX_LEVEL = 40

export default function mergeTrainerData(trainers) {
  // data needs to be in format of [{date: ..., <trainerName>: ..., <trainerName>: ..., }]
  var data = []
  var nextLevelXps = {}

  trainers.forEach(trainer => {
    var highestXp = 0
    trainer.xpUpdates.forEach(update => {
      const date = new Date(update.date).getTime()
      highestXp = Math.max(highestXp, update.value)

      var obj = {
        name: trainer.username,
        value: update.value,
      }

      const datum = data.find(d => d.date == date)
      if (datum)
        datum[trainer.username] = update.value
      else
        data.push({
          date,
          [trainer.username]: update.value,
        })
    })

    const level = parseInt(getLevelForXP(highestXp))
    if (level < MAX_LEVEL)
      nextLevelXps[trainer.username] = minXPForLevel[level + 1]
  })

  return {
    data,
    nextLevelXps,
  }
}
