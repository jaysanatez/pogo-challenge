import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ModalWrapper from './ModalWrapper'
import {
  Role,
  RoleStrings,
  Team,
  TeamStrings,
} from '../../shared/lookups'

export default class CreateTrainerModal extends Component {
  renderEnumOptions(Enum, stringMap) {
    var options = []
    Object.keys(Enum).forEach(e => {
      var eVal = Enum[e]
      options.push(<option key={ eVal } id={ eVal }>{ stringMap[eVal] }</option>)
    })

    return options
  }

  onClick() {
    const { username, team, role } = this.refs
    var data = {
      username: username.value.trim(),
      team: parseInt(team[team.selectedIndex].id),
      role: parseInt(role[role.selectedIndex].id),
    }

    this.props.onTrainerCreate(data)
  }

  render() {
    return (
      <ModalWrapper
        id="createTrainerModal"
        title="Add Trainer"
        buttonText="Create"
        onClick={this.onClick.bind(this)}
      >
        <form>
          <div className="form-group">
            <input type="text" className="form-control" ref="username" placeholder="Username"/>
          </div>
          <div className="form-group">
            <select className="form-control" ref="team">
              { this.renderEnumOptions(Team, TeamStrings) }
            </select>
          </div>
          <div className="form-group">
            <select className="form-control" ref="role">
              { this.renderEnumOptions(Role, RoleStrings) }
            </select>
          </div>
        </form>
      </ModalWrapper>
    )
  }
}

CreateTrainerModal.propTypes = {
  onTrainerCreate: PropTypes.func.isRequired,
}