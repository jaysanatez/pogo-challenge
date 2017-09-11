import React, { Component } from 'react'
import PropTypes from 'prop-types'
import commaNumber from 'comma-number'

import { formatDate, SHORT_DATE_STRING } from '../../shared/utils'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
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

    var data = []
    updates.forEach(u => {
      data.push({
        date: formatDate(u.date, SHORT_DATE_STRING),
        value: u.value,
      })
    })

    return data
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
  	const data = this.createXpData(updates)
    const { mult, label } = this.getXpGraphScale(data)

    return (
      <div>
        <h3>
          XP Growth
          <small className="text-muted ml-2">In { label }</small>
        </h3>
        <ResponsiveContainer height={300} width="100%" className="mt-3">
          <LineChart data={data}>
            <Line type="monotone" dataKey="value" stroke="#4285F4"/>
            <CartesianGrid stroke="#ccc"/>
            <XAxis
              dataKey="date"
              padding={{ left: 10, right: 10 }}
            />
            <YAxis
              type="number"
              domain={['auto', 'auto']}
              padding={{ top: 20, bottom: 20 }}
              tickFormatter={lab => lab / mult}
            />
            <Tooltip formatter={val => commaNumber(val)}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

XPGraph.propTypes = {
  updates: PropTypes.array.isRequired,
}