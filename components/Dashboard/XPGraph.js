import React, { Component } from 'react'
import PropTypes from 'prop-types'
import commaNumber from 'comma-number'
import Moment from 'moment'

import {
  formatDate,
  SHORT_DATE_STRING,
  minXPForLevel,
  getLevelForXP,
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
  createXpData(updates) {
    updates.sort((u1, u2) => {
      return new Date(u1.date) - new Date(u2.date)
    })

    const UPDATE_LIMIT = 30
    if (updates.length > UPDATE_LIMIT) {
      updates = updates.slice(0, UPDATE_LIMIT)
    }

    var highestXp = 0
    var ticks = []
    var data = []

    updates.forEach(u => {
      highestXp = Math.max(highestXp, u.value)
      const date = new Date(u.date).getTime()

      ticks.push(date)
      data.push({
        date,
        value: u.value,
      })
    })

    const level = parseInt(getLevelForXP(highestXp))
    const nextLevelXp = minXPForLevel[level + 1]
    return {
      data,
      nextLevelXp,
      ticks,
    }
  }

  getXpGraphScale(data) {
    const mult = data.find(d => d.value > 1000000) ? 1000000 : 1000
    return {
      mult,
      label: mult == 1000000 ? 'Millions' : 'Thousands'
    }
  }

  render() {
    const { updates } = this.props
    if (!updates.length) {
      return null
    }

    const { data, nextLevelXp, ticks } = this.createXpData(updates)
    const { mult, label } = this.getXpGraphScale(data)
    const userColor = '#4285F4'
    const timeToDateString = time => Moment(time).format(SHORT_DATE_STRING)

    return (
      <div>
        <h3>
          XP Growth
          <small className="text-muted ml-2">In { label }</small>
        </h3>
        <ResponsiveContainer height={300} width="100%" className="mt-3">
          <LineChart data={data}>
            <Line type="monotone" dataKey="value" stroke={userColor}/>
            <CartesianGrid stroke="#ccc"/>
            <XAxis
              dataKey="date"
              padding={{ left: 10, right: 10 }}
              type="number"
              domain={['dataMin', 'dataMax']}
              tickFormatter={timeToDateString}
              ticks={ticks}
            />
            <YAxis
              type="number"
              domain={['auto', nextLevelXp]}
              padding={{ top: 20, bottom: 20 }}
              tickFormatter={lab => lab / mult}
            />
            <ReferenceLine y={nextLevelXp} stroke={userColor} strokeDasharray="3 3" />
            <Tooltip formatter={val => commaNumber(val)} labelFormatter={timeToDateString} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

XPGraph.propTypes = {
  updates: PropTypes.array.isRequired,
}