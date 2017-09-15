import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment'
import DatePicker from 'react-datepicker'

import PokemonSearchInput from './PokemonSearchInput'
import LocationSearchInput from './LocationSearchInput'
import ModalWrapper from '../ModalWrapper'
import { formatDate, LONG_DATE_STRING } from '../../../shared/utils'

export default class AddCatchModal extends Component {
  constructor(props) {
    super(props)

    this.selectedPokemonValue = null
    this.selectedLocationValue = null
    this.locationInput = null
    this.selectedDay = Moment()

    this.onPokemonValueChange = this.onPokemonValueChange.bind(this)
    this.onLocationValueChange = this.onLocationValueChange.bind(this)
    this.onDateChange = this.onDateChange.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  onPokemonValueChange(value) {
    this.selectedPokemonValue = value
  }

  onLocationValueChange(value) {
    this.selectedLocationValue = value
  }

  onDateChange(date) {
    this.selectedDay = date
    this.forceUpdate()
  }

  onClick() {
    if (!this.selectedPokemonValue || !this.selectedLocationValue) {
      this.props.setStatus('Error! Insufficient data provided.')
      return
    }

    const loc = this.selectedLocationValue
    const data = {
      pokemonId: this.selectedPokemonValue.value,
      location: loc,
      date: formatDate(this.selectedDay, LONG_DATE_STRING),
    }

    this.props.onCatchCreate(data)
  }

  render() {
    return (
      <ModalWrapper
        id="addCatchModal"
        title="Add Catch"
        buttonText="Save"
        onClick={this.onClick}
      >
        <form>
          <PokemonSearchInput onChange={this.onPokemonValueChange}/>
          <LocationSearchInput onChange={this.onLocationValueChange}/>
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

AddCatchModal.propTypes = {
  onCatchCreate: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
}
