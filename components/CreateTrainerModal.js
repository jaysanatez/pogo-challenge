import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Role, Team } from '../server/lookups'

export default class CreateTrainerModal extends Component {

  renderTeamOptions() {
    var options = []

  	Object.keys(Team).forEach(team => {
  	  var t = Team[team]
  	  options.push(<option key={ t.key } id={ t.key }>{ t.value }</option>)
  	})

  	return options
  }

  renderRoleOptions() {
  	var options = []

  	Object.keys(Role).forEach(role => {
  	  var r = Role[role]
  	  options.push(<option key={ r.key } id={ r.key }>{ r.value }</option>)
  	})

  	return options
  }

  onClick(event) {
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
  	  <div className="modal fade" id="add-trainer-modal" tabIndex="-1" role="dialog" aria-labelledby="modal-label" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modal-label">Add Trainer</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <input type="text" className="form-control" ref="username" placeholder="Username"/>
                </div>
                <div className="form-group">
                  <select className="form-control" ref="team">
                    { this.renderTeamOptions() }
                  </select>
                </div>
                <div className="form-group">
                  <select className="form-control" ref="role">
                    { this.renderRoleOptions() }
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#add-trainer-modal" onClick={ this.onClick.bind(this) }>Create</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CreateTrainerModal.propTypes = {
  onTrainerCreate: PropTypes.func.isRequired,
}