import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { formatDate, DATE_TIME_STRING } from '../shared/utils'
import LoadingThrobber from './shared/LoadingThrobber'
import CreateTrainerModal from './Modals/CreateTrainerModal'
import {
  Team,
  Status,
  Role,
  TeamStrings,
  StatusStrings,
  RoleStrings,
} from '../shared/lookups'

export default class Trainers extends Component {
  renderTableData() {
    const {
      trainer,
      trainers,
      catches,
      onTrainerDelete,
    } = this.props
    var rows = []
    var catchMap = {}

    catches.forEach(c => {
      const id = c.userId
      if (catchMap[id])
        catchMap[id] += 1
      else
        catchMap[id] = 1
    })

    var onDelete = trainer => {
      return evt => {
        onTrainerDelete(trainer._id)
      }
    }

    trainers.forEach(t => {
      const link = t.status == Status.CREATED ?
        <a href={'/verify/' + t._id}>Verify</a> :
        null

      const button = trainer.username != t.username ?
        (<button type="button" className="close" aria-label="Close" onClick={onDelete(t)}>
          <span aria-hidden="true">&times;</span>
        </button>) :
        null

      const defaultCount = t.status == Status.VERIFIED ? 0 : ''
      rows.push(
        <tr key={t.username}>
          <td>{ t.username }</td>
          <td>{ TeamStrings[t.team] }</td>
          <td>{ StatusStrings[t.status] }</td>
          <td>{ RoleStrings[t.role] }</td>
          <td>{ t.xpUpdates.length }</td>
          <td>{ t.pokedex.length }</td>
          <td>{ catchMap[t._id] || defaultCount }</td>
          <td>{ formatDate(t.lastUpdated, DATE_TIME_STRING) }</td>
          <td>
            { button }
            { link }
          </td>
        </tr>
      )
    })

    return rows
  }

  render() {
    const { trainers, onTrainerCreate } = this.props
    return (
      <div>
        <button type="button" className="btn btn-primary mt-3" data-toggle="modal" data-target="#createTrainerModal">Add Trainer</button>
        <table className="table table-hover table-responsive mt-3">
          <thead>
            <tr>
              <th>Username</th>
              <th>Team</th>
              <th>Status</th>
              <th>Role</th>
              <th># XP Updates</th>
              <th>Pokedex Count</th>
              <th># Catches</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.renderTableData() }
          </tbody>
        </table>

        <CreateTrainerModal onTrainerCreate={onTrainerCreate}/>
      </div>
    )
  }
}

Trainers.propTypes = {
  trainer: PropTypes.object,
  trainers: PropTypes.array.isRequired,
  catches: PropTypes.array.isRequired,
  onTrainerCreate: PropTypes.func.isRequired,
  onTrainerDelete: PropTypes.func.isRequired,
}
