import React, { Component } from 'react'
import { Team, Status, Role, getText } from '../server/lookups'
import Moment from 'moment'
import CreateTrainerModal from './CreateTrainerModal'

export default class Trainers extends Component {
  renderTableData() {
    const { trainers, onTrainerDelete } = this.props
    var rows = []

    Moment.locale('en')
    var formatStr = 'MMMM Do, YYYY'

    var onDelete = trainer => {
      return evt => {
        onTrainerDelete(trainer._id)
      }
    }

    trainers.forEach(t => {
      rows.push(
        <tr key={t.username}>
          <td>{ t.username }</td>
          <td>{ getText(Team, t.team) }</td>
          <td>{ getText(Status, t.status) }</td>
          <td>{ getText(Role, t.role) }</td>
          <td>{ t.xpUpdates.length }</td>
          <td>{ Moment(t.lastUpdated).format(formatStr) }</td>
          <td>
            <button type="button" className="close" aria-label="Close" onClick={onDelete(t)}>
              <span aria-hidden="true">&times;</span>
            </button>
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
