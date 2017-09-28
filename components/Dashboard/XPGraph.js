import React, { Component } from 'react'
import PropTypes from 'prop-types'
import commaNumber from 'comma-number'
import Moment from 'moment'

import { UserScopes } from '../../app/displayOptions'
import mergeTrainerData from './mergeTrainerData'
import {
  formatDate,
  SHORT_DATE_STRING,
} from '../../shared/utils'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from 'recharts'

export default class XPGraph extends Component {
  createXpData(trainers) {
    var { data, nextLevelXps } = mergeTrainerData(trainers)

    data.sort((a, b) => {
      return new Date(a.date) - new Date(b.date)
    })

    const DATA_LIMIT = 30
    if (data.length > DATA_LIMIT) {
      data = data.slice(data.length - DATA_LIMIT)
    }

    return {
      data,
      nextLevelXps,
    }
  }

  getXpGraphScale(data) {
    const mil = 1000000
    const mult = data.some(d => {
      return Object.keys(d).some(k => k != 'date' && d[k] > mil)
    }) ? mil : 1000
    return {
      mult,
      label: mult == mil ? 'Millions' : 'Thousands'
    }
  }

  render() {
    const { trainer, trainers, userScope } = this.props
    const trainersToShow = userScope == UserScopes.ME ? [trainer] : trainers
    if (!trainersToShow.length) {
      return null
    }

    const { data, nextLevelXps } = this.createXpData(trainersToShow)
    const { mult, label } = this.getXpGraphScale(data)
    const highestNextLevelUp = Math.max.apply(null, Object.values(nextLevelXps))

    const userColor = '#4285F4'
    const timeToDateString = time => Moment(time).format(SHORT_DATE_STRING)

    const lines = []
    const refLines = []
    Object.keys(nextLevelXps).forEach(k => {
      lines.push(
        <Line key={k + '-line'} type="monotone" dataKey={k} stroke={userColor}/>
      )

      refLines.push(
        <ReferenceLine key={k + '-ref'} y={nextLevelXps[k]} stroke={userColor} strokeDasharray="3 3" /> // todo: color based off k
      )
    })

    return (
      <div>
        <h3>
          XP Growth
          <small className="text-muted ml-2">In { label }</small>
        </h3>
        <ResponsiveContainer height={300} width="100%" className="mt-3">
          <LineChart data={data}>
            { lines }
            { refLines }
            <CartesianGrid stroke="#ccc"/>
            <XAxis
              dataKey="date"
              padding={{ left: 10, right: 10 }}
              type="number"
              domain={['dataMin', 'dataMax']}
              tickFormatter={timeToDateString}
              ticks={data.map(d => d.date)}
            />
            <YAxis
              type="number"
              domain={['auto', highestNextLevelUp]}
              padding={{ top: 20, bottom: 20 }}
              tickFormatter={lab => lab / mult}
            />
            <Tooltip formatter={val => commaNumber(val)} labelFormatter={timeToDateString} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

XPGraph.propTypes = {
  trainer: PropTypes.object.isRequired,
  trainers: PropTypes.array.isRequired,
  userScope: PropTypes.string.isRequired,
}