import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TeamStrings } from '../server/lookups'
import { formatDate } from './utils'

export default class Profile extends Component {
  
  OnXpUpdateClick(event) {
  	event.preventDefault()
  	console.log('update')
  }

  renderHeader(trainer) {
  	return (
  	  <div className="card mt-3">
        <div className="card-block">
          <h3 className="card-title">{ trainer.username }</h3>
          <p className="card-text">{ TeamStrings[trainer.team] } | Last Updated: { formatDate(trainer.lastUpdated) }</p>
        </div>
      </div>
    )
  }

  renderXpTable(xpUpdates) {
    if (!xpUpdates.length) {
      return (<p className="mt-3 text-center">No XP updates entered.</p>)
    }
  }

  render() {
  	const { trainer } = this.props

    if (!trainer) {
      return null
    }

    return (
      <div className="mt-3">
        { this.renderHeader(trainer) }
        <div className="row justify-content-end mt-3 mr-1">
          <a href="#" onClick={this.OnXpUpdateClick.bind(this)}>Update XP</a>
        </div>
        { this.renderXpTable(trainer.xpUpdates) }
      </div>
    )
  }
}

Profile.propTypes = {
  trainer: PropTypes.object,
}
