import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Status } from '../server/lookups'

export default class Verify extends Component {
  onClick(event) {
    const { password, confirm } = this.refs
    const { match, setVerifyStatus, verifyTrainer } = this.props
    const pwd = password.value.trim()

    if (!pwd) {
      setVerifyStatus('Password can\'t be blank')
    } else if (pwd != confirm.value.trim()) {
      setVerifyStatus('Passwords must match')
    } else {
      console.log(match.params.trainerId, pwd)
      verifyTrainer(match.params.trainerId, pwd)
    }
  }

  renderLoadingScreen() {
    return (
      <div className="mt-3">
        <i className="fa fa-circle-o-notch fa-spin" style={{ fontSize: "48px" }}></i>
      </div>
    )
  }

  renderVerifyForm(trainer, message) {
    var flash = message ?
      (<div className="alert alert-danger mt-3" role="alert">
        { message }
      </div>) :
      null

  	return (
      <div className="mt-3">
        <h2>Verify {trainer.username}</h2>
        { flash }        

        <form className="mt-3">
          <div className="form-group">
            <input type="password" className="form-control" ref="password" placeholder="Password"/>
          </div>
          <div className="form-group">
            <input type="password" className="form-control" ref="confirm" placeholder="Confirm Password"/>
          </div>
          <button type="button" className="btn btn-primary" onClick={ this.onClick.bind(this) }>Complete</button>
        </form>
      </div>
    )
  }

  render() {
  	const {
      match,
      trainer,
      message,
      fetchTrainer,
  	} = this.props
    const trainerId = match.params.trainerId

    if (!trainerId) {
      return null
    }

    if (!trainer) {
      fetchTrainer(trainerId)
      return this.renderLoadingScreen()
    } else if (trainer.status == Status.CREATED) {
      return this.renderVerifyForm(trainer, message)
    } else {
      return null
    }
  }
}

Verify.propTypes = {
  trainerId: PropTypes.string,
  trainer: PropTypes.object,
  verifyTrainer: PropTypes.func.isRequired,
  fetchTrainer: PropTypes.func.isRequired,
  setVerifyStatus: PropTypes.func.isRequired,
}

