import React, { Component } from 'react'
import PropTypes from 'prop-types'

import LoadingThrobber from './shared/LoadingThrobber'
import { Status } from '../shared/lookups'

export default class Verify extends Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick(event) {
    const { password, confirm } = this.refs
    const { match, setStatus, verifyTrainer } = this.props
    const pwd = password.value.trim()

    if (!pwd) {
      setStatus('Password can\'t be blank')
    } else if (pwd != confirm.value.trim()) {
      setStatus('Passwords must match')
    } else {
      verifyTrainer(match.params.trainerId, pwd)
    }
  }

  renderVerifyForm(trainer, message) {
    var flash = message ?
      (<div className="alert alert-danger mt-3" role="alert">
        { message }
      </div>) :
      null

  	return (
      <div className="mt-3">
        { flash }
        <h2>Verify {trainer.username}</h2>        

        <form className="mt-3">
          <div className="form-group">
            <input type="password" className="form-control" ref="password" placeholder="Password"/>
          </div>
          <div className="form-group">
            <input type="password" className="form-control" ref="confirm" placeholder="Confirm Password"/>
          </div>
          <button type="button" className="btn btn-primary" onClick={this.onClick}>Complete</button>
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
      return (<LoadingThrobber/>)
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
  setStatus: PropTypes.func.isRequired,
}

