import React, { Component } from 'react'
import PropTypes from 'prop-types'
import commaNumber from 'comma-number'

import ProfileTable from './ProfileTable'
import {
  getLevelForXP,
} from '../../shared/utils'

export default class UserXPTable extends Component {
  constructor(props) {
    super(props)
    this.onXpUpdateClick = this.onXpUpdateClick.bind(this)
  }

  onXpUpdateClick(event) {
    event.preventDefault()
  }

  sortUpdates(updates) {
    return updates.sort((u1, u2) => {
      return new Date(u2.date) - new Date(u1.date)
    })
  }

  buildRowFromUpdate(u) {
    return (
      <tr key={ new Date(u.date).getTime() }>
        <td>{ commaNumber(u.value) }</td>
        <td>{ getLevelForXP(u.value) }</td>
        <td>{ u.date }</td>
      </tr>
    )
  }

  render() {
    const { updates } = this.props
    const headerTitles = ['XP', 'Level', 'Date']
    return (
      <div>
        <ProfileTable
          headerTitles={headerTitles}
          emptyText="No XP updates recorded."
          data={this.sortUpdates(updates)}
          getRowFunc={this.buildRowFromUpdate}
        />
        <div className="row justify-content-end mt-3 mr-1">
          <a href="#" data-toggle="modal" data-target="#xpUpdateModal" onClick={this.onXpUpdateClick}>Update XP</a>
        </div>
      </div>
    )
  }
}

UserXPTable.propTypes = {
  updates: PropTypes.array.isRequired,
}