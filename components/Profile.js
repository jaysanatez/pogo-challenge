import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { TeamStrings } from '../shared/lookups'
import UpdateXPModal from './Modals/UpdateXPModal'
import {
  formatDate,
  DATE_TIME_STRING,
  DATE_STRING,
  getTrainerLevel,
  getLevelForXP,
} from '../shared/utils'

export default class Profile extends Component {
  
  OnXpUpdateClick(event) {
  	event.preventDefault()
  }

  renderHeader(trainer) {
  	return (
  	  <div className="card mt-3">
        <div className="card-block">
          <h3 className="card-title">{ trainer.username }</h3>
          <p className="card-text">Level { getTrainerLevel(trainer) } | { TeamStrings[trainer.team] } | Updated on { formatDate(trainer.lastUpdated, DATE_TIME_STRING) }</p>
        </div>
      </div>
    )
  }

  renderXpTable(xpUpdates) {
    if (!xpUpdates.length) {
      return (<p className="mt-3 text-center">No XP updates entered.</p>)
    }

    var rows = []

    // sort chronologically
    const updates = xpUpdates.sort((u1, u2) => {
      return new Date(u1.date) - new Date(u2.date)
    })

    // map to row
    updates.forEach(u => {
      rows.push(
        <tr key={ new Date(u.date).getTime() }>
          <td>{ u.value }</td>
          <td>{ getLevelForXP(u.value) }</td>
          <td>{ formatDate(u.date, DATE_STRING) }</td>
        </tr>
      )
    })

    return (
      <table className="table table-hover mt-3">
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
    )
  }

  render() {
    const {
      trainer,
      message,
      onXPUpdate,
      setStatus,
    } = this.props

    if (!trainer) {
      return null
    }

    var flash = message ?
      (<div className="alert alert-danger mt-3" role="alert">
        { message }
      </div>) :
      null

    return (
      <div className="mt-3">
        { flash }
        { this.renderHeader(trainer) }
        <div className="row justify-content-end mt-3 mr-1">
          <a href="#" data-toggle="modal" data-target="#xpUpdateModal" onClick={this.OnXpUpdateClick.bind(this)}>Update XP</a>
        </div>
        { this.renderXpTable(trainer.xpUpdates) }

        <UpdateXPModal
          onXPUpdate={onXPUpdate}
          setStatus={setStatus}
        />
      </div>
    )
  }
}

Profile.propTypes = {
  trainer: PropTypes.object,
  onXPUpdate: PropTypes.func.isRequired,
}
