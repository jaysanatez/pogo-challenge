import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import Moment from 'moment'

import ModalWrapper from './ModalWrapper'
import { formatDate, LONG_DATE_STRING } from '../../shared/utils'
import 'react-datepicker/dist/react-datepicker.css'

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
      date: formatDate(this.selectedDay, LONG_DATE_STRING),
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
      <ModalWrapper
        id="xpUpdateModal"
        title="Update XP"
        buttonText="Update"
        onClick={this.onClick}
      >
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
      </ModalWrapper>
    )
  }
}

UpdateXPModal.propTypes = {
  onXPUpdate: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
}