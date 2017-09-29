import React, { Component } from 'react'
import PropTypes from 'prop-types'
import commaNumber from 'comma-number'
import Moment from 'moment'

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
  Legend,
} from 'recharts'

const BASE_HEIGHT = 300
const LEGEND_HEIGHT = 40

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

  getLegend(justMe) {
    return justMe ? null : 
      (<Legend verticalAlign="bottom" height={LEGEND_HEIGHT}/>)
  }

  render() {
    const { trainers } = this.props
    const justMe = trainers.length == 1
    if (!trainers.length) {
      return null
    }

    const { data, nextLevelXps } = this.createXpData(trainers)
    const { mult, label } = this.getXpGraphScale(data)
    const highestNextLevelUp = Math.max.apply(null, Object.values(nextLevelXps))
    const timeToDateString = time => Moment(time).format(SHORT_DATE_STRING)

    const colors = ['#0099CC', '#00C851', '#FF8800', '#FF4444']
    const colorMap = {}
    trainers.forEach((t, idx) => colorMap[t.username] = colors[idx])

    const lines = []
    const refLines = []
    Object.keys(nextLevelXps).forEach(k => {
      lines.push(
        <Line key={k + '-line'} type="monotone" dataKey={k} stroke={colorMap[k]} connectNulls={true}/>
      )

      refLines.push(
        <ReferenceLine key={k + '-ref'} y={nextLevelXps[k]} stroke={colorMap[k]} strokeDasharray="3 3" />
      )
    })

    return (
      <div>
        <h3>
          XP Growth
          <small className="text-muted ml-2">In { label }</small>
        </h3>
        <ResponsiveContainer height={justMe ? BASE_HEIGHT : (BASE_HEIGHT + LEGEND_HEIGHT) } width="100%" className="mt-3">
          <LineChart data={data}>
            { lines }
            { refLines }
            { this.getLegend(justMe) }
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
  trainers: PropTypes.array.isRequired,
}