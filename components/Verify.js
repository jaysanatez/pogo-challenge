import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Verify extends Component {
  onClick(event) {
    const { password, confirm } = this.refs
    const { trainerId } = this.props
    const pwd = password.value.trim()

    if (!pwd) {
      alert('password can\'t be blank')
    } else if (pwd != confirm.value.trim()) {
      alert('passwords must match')
    } else {
      this.props.verifyTrainer(trainerId, pwd)
    }
  }

  renderLoadingScreen() {
    return (
      <i className="fa fa-circle-o-notch fa-spin" style={{ fontSize: "48px" }}></i>
    )
  }

  renderVerifyForm(ensureResult) {
    if (!ensureResult.trainer) {
      return (
        <div className="alert alert-danger" role="alert">
          { ensureResult.message }
        </div>
      )
    }

  	return (
      <div className="mt-3">
        <h2>Verify {ensureResult.trainer.username}</h2>
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

  renderVerifySuccess(verifyResult) {
    return (
      <div className="alert alert-success" role="alert">
        { verifyResult.trainer.username }, you're ready to roll.
      </div>
    )
  }

  render() {
  	const {
      trainerId,
      ensureResult,
      ensureTrainer,
      verifyResult,
  	} = this.props;

  	if (verifyResult) {
      return this.renderVerifySuccess(verifyResult)
    } else if (ensureResult) {
      return this.renderVerifyForm(ensureResult)
  	} else {
      ensureTrainer(trainerId)
      return this.renderLoadingScreen()
  	}
  }
}

Verify.propTypes = {
  trainerId: PropTypes.string.isRequired,
  ensureResult: PropTypes.object,
  verifyResult: PropTypes.object,
  ensureTrainer: PropTypes.func.isRequired,
  verifyTrainer: PropTypes.func.isRequired,
}

