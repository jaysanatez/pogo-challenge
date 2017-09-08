import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment'

import CreateTrainerModal from './CreateTrainerModal'
import {
  Team,
  Status,
  Role,
  TeamStrings,
  StatusStrings,
  RoleStrings,
} from '../server/lookups'

export default class Trainers extends Component {
  renderTableData() {
    const { trainer, trainers, onTrainerDelete } = this.props
    var rows = []

    Moment.locale('en')
    var formatStr = 'MMM D, hh:mm a'

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

      rows.push(
        <tr key={t.username}>
          <td>{ t.username }</td>
          <td>{ TeamStrings[t.team] }</td>
          <td>{ StatusStrings[t.status] }</td>
          <td>{ RoleStrings[t.role] }</td>
          <td>{ t.xpUpdates.length }</td>
          <td>{ Moment(t.lastUpdated).format(formatStr) }</td>
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

    if (trainers.length == 0) {
      this.props.fetchTrainers()
    }

    return (
      <div>
        <button type="button" className="btn btn-primary mt-3" data-toggle="modal" data-target="#add-trainer-modal">Add Trainer</button>
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Username</th>
              <th>Team</th>
              <th>Status</th>
              <th>Role</th>
              <th># XP Updates</th>
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
  onTrainerCreate: PropTypes.func.isRequired,
  onTrainerDelete: PropTypes.func.isRequired,
}
