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

    this.state = {
      selectedDay: Moment(),
    }

    this.onPokemonValueChange = this.onPokemonValueChange.bind(this)
    this.onLocationValueChange = this.onLocationValueChange.bind(this)
    this.onDateChange = this.onDateChange.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  onPokemonValueChange(value) {
    this.state.selectedPokemonValue = value
  }

  onLocationValueChange(value) {
    this.state.selectedLocationValue = value
  }

  onDateChange(date) {
    this.state.selectedDay = date
    this.forceUpdate()
  }

  onClick() {
    const { selectedPokemonValue, selectedLocationValue, selectedDay } = this.state
    const { setStatus, onCatchCreate } = this.props

    if (!selectedPokemonValue || !selectedLocationValue) {
      setStatus('Error! Insufficient data provided.')
      return
    }

    const loc = selectedLocationValue
    const data = {
      pokemonId: selectedPokemonValue.value,
      location: loc,
      date: formatDate(selectedDay, LONG_DATE_STRING),
    }

    onCatchCreate(data)
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
              selected={this.state.selectedDay}
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
