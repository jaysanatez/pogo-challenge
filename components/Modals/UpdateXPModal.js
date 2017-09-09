import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import Moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'
import { formatDate, DATE_STRING } from '../../shared/utils'

export default class UpdateXPModal extends Component {
  constructor(props) {
    super(props)

    this.onDateChange = this.onDateChange.bind(this)
    this.onClick = this.onClick.bind(this)
    this.selectedDay = Moment()
  }

  onClick() {
    const { xp } = this.refs
    const { setStatus, onXPUpdate } = this.props

    const data = {
      value: xp.value,
      date: formatDate(this.selectedDay, DATE_STRING),
    }

    if (data.value < 0) {
      setStatus('XP Value cannot be less than zero.')
    } else {
      onXPUpdate(data)
    }
  }

  onDateChange(date) {
    this.selectedDay = date
    this.forceUpdate()
  }

  render() {
    return (
      <div className="modal fade" id="xpUpdateModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Update XP</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <input type="number" className="form-control" ref="xp" placeholder="XP"/>
                </div>
                <div className="form-group">
                  <DatePicker
                    selected={this.selectedDay}
                    onChange={this.onDateChange}
                    maxDate={Moment()}
                    placeholderText="Select a day"
                    className="form-control"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#xpUpdateModal" onClick={this.onClick}>Update</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

UpdateXPModal.propTypes = {
  onXPUpdate: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
}