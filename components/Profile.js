import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { TeamStrings } from '../server/lookups'
import { formatDate, DISPLAY_STRING, getTrainerLevel } from './utils'
import UpdateXPModal from './Modals/UpdateXPModal'

export default class Profile extends Component {
  
  OnXpUpdateClick(event) {
  	event.preventDefault()
  }

  renderHeader(trainer) {
  	return (
  	  <div className="card mt-3">
        <div className="card-block">
          <h3 className="card-title">{ trainer.username }</h3>
          <p className="card-text">Level { getTrainerLevel(trainer) } | { TeamStrings[trainer.team] } | Updated on { formatDate(trainer.lastUpdated, DISPLAY_STRING) }</p>
        </div>
      </div>
    )
  }

  renderXpTable(xpUpdates) {
    if (!xpUpdates.length) {
      return (<p className="mt-3 text-center">No XP updates entered.</p>)
    }

    // TODO: make the table
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
