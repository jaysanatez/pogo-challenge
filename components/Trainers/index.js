import React, { Component } from 'react'
import PropTypes from 'prop-types'

import LoadingThrobber from '../shared/LoadingThrobber'
import CreateTrainerModal from '../Modals/CreateTrainerModal'
import TrainerTableHeader from './TrainerTableHeader'
import TrainerTableRow from './TrainerTableRow'
import { Status } from '../../shared/lookups'

export default class Trainers extends Component {
  renderTableBody() {
    const {
      trainer,
      trainers,
      onTrainerDelete,
    } = this.props

    const rows = trainers.map(t => {
      return (
        <TrainerTableRow
          key={t.username}
          trainer={t}
          onTrainerDelete={onTrainerDelete}
          showDeleteButton={trainer.username != t.username}
          showVerifyLink={t.status == Status.CREATED}
        />
      )
    })

    return (
      <tbody>
        { rows }
      </tbody>
    )
  }

  render() {
    const { trainers, onTrainerCreate } = this.props
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary mt-3"
          data-toggle="modal"
          data-target="#createTrainerModal"
        >
          Add Trainer
        </button>
        <table className="table table-hover table-responsive mt-3">
          <TrainerTableHeader/>
          { this.renderTableBody() }
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
