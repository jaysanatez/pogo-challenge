import React, { Component } from 'react'
import PropTypes from 'prop-types'
import commaNumber from 'comma-number'

import {
  formatDate,
  LONG_DATE_STRING,
  getLevelForXP,
} from '../../shared/utils'

export default class UserXPTable extends Component {
  onXpUpdateClick(event) {
    event.preventDefault()
  }

  renderXpTable(xpUpdates) {
    if (!xpUpdates.length) {
      return (<p className="mt-3 text-center">No XP updates recorded.</p>)
    }

    // sort chronologically
    const updates = xpUpdates.sort((u1, u2) => {
      return new Date(u2.date) - new Date(u1.date)
    })

    // map to row
    var rows = []
    updates.forEach(u => {
      rows.push(
        <tr key={ new Date(u.date).getTime() }>
          <td>{ commaNumber(u.value) }</td>
          <td>{ getLevelForXP(u.value) }</td>
          <td>{ formatDate(u.date, LONG_DATE_STRING) }</td>
        </tr>
      )
    })

    return (
      <div className="mt-3" style={{ height: "250px", overflow: "auto" }}>
        <table className="table table-hover table-sm">
          <thead>
            <tr>
              <th>XP</th>
              <th>Level</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            { rows }
          </tbody>
        </table>
      </div>
    )
  }

  render() {
    const { updates } = this.props 
    return (
      <div>
        { this.renderXpTable(updates) }
        <div className="row justify-content-end mt-3 mr-1">
          <a href="#" data-toggle="modal" data-target="#xpUpdateModal" onClick={this.onXpUpdateClick.bind(this)}>Update XP</a>
        </div>
      </div>
    )
  }
}

UserXPTable.propTypes = {
  updates: PropTypes.array.isRequired,
}