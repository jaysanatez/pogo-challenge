import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts'

import { formatDate, SHORT_DATE_STRING } from '../shared/utils'

export default class Dashboard extends Component {

  getXpGraphScale(data) {
    const mult = data.find(d => d.value > 1000000) ? 1000000 : 1000
    return {
      mult,
      label: mult == 1000000 ? 'Millions' : 'Thousands'
    }
  }

  renderXpGraph(data) {
    const { mult, label } = this.getXpGraphScale(data)
    return (
      <div>
        <h3>
          XP Growth
          <small className="text-muted ml-2">In { label }</small>
        </h3>
        <ResponsiveContainer height={300} width="100%" className="mt-3">
          <LineChart data={data}>
            <Line type="monotone" dataKey="value" stroke="#FF4444"/>
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
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }

  createXpData(updates) {
    updates.sort((u1, u2) => {
      return new Date(u1.date) - new Date(u2.date)
    })

    var data = []
    updates.forEach(u => {
      data.push({
        date: formatDate(u.date, SHORT_DATE_STRING),
        value: u.value,
      })
    })

    return data
  }

  render() {
    const { trainer } = this.props
    if (!trainer) {
      return null
    }

    const xpData = this.createXpData(trainer.xpUpdates)
    return (
      <div className="mt-3">
        { this.renderXpGraph(xpData) }
      </div>
    )
  }
}

Dashboard.propTypes = {
  trainer: PropTypes.object,
}
