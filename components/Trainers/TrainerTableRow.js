import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { formatDate, DATE_TIME_STRING } from '../../shared/utils'
import {
  Status,
  TeamStrings,
  StatusStrings,
  RoleStrings,
} from '../../shared/lookups'

export default class TrainerTableRow extends Component {
  render() {
    const {
      trainer,
      numCatches,
      onTrainerDelete,
      showDeleteButton,
      showVerifyLink
    } = this.props

    const t = trainer
    const defaultCount = t.status == Status.VERIFIED ? 0 : ''

    var onDelete = trainer => {
      return evt => {
        onTrainerDelete(trainer._id)
      }
    }

    const button = showDeleteButton ?
      (<button type="button" className="close" aria-label="Close" onClick={onDelete(t)}>
        <span aria-hidden="true">&times;</span>
      </button>) :
      null

    const link = showVerifyLink ?
      (<a href={'/verify/' + t._id}>Verify</a>) :
      null

    return (
      <tr>
        <td>{ t.username }</td>
        <td>{ TeamStrings[t.team] }</td>
        <td>{ StatusStrings[t.status] }</td>
        <td>{ RoleStrings[t.role] }</td>
        <td>{ t.xpUpdates.length }</td>
        <td>{ t.pokedex.length }</td>
        <td>{ numCatches || defaultCount }</td>
        <td>{ formatDate(t.lastUpdated, DATE_TIME_STRING) }</td>
        <td>
          { button }
          { link }
        </td>
      </tr>
    )
  }
}

TrainerTableRow.propTypes = {
  trainer: PropTypes.object.isRequired,
  numCatches: PropTypes.number,
  onTrainerDelete: PropTypes.func.isRequired,
  showDeleteButton: PropTypes.bool.isRequired,
  showVerifyLink: PropTypes.bool.isRequired,
}
