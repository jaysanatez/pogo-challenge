import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import Moment from 'moment'

import ModalWrapper from './ModalWrapper'
import { formatDate, LONG_DATE_STRING } from '../../shared/utils'
import 'react-datepicker/dist/react-datepicker.css'

export default class AddPokedexModal extends Component {
  constructor(props) {
    super(props)

    this.onDateChange = this.onDateChange.bind(this)
    this.onClick = this.onClick.bind(this)
    this.selectedDay = Moment()
  }

  onClick() {
    const { onAddClick, pokemon } = this.props
    const date = formatDate(this.selectedDay, LONG_DATE_STRING)
    onAddClick({
      pokemonId: pokemon.id,
      date,
    })
  }

  onDateChange(date) {
    this.selectedDay = date
    this.forceUpdate()
  }

  render() {
    const { pokemon } = this.props
    const title = pokemon ? 
      ('Add ' + pokemon.name) :
      'Add to Pokedex'

    return (
      <ModalWrapper
        id="addPokedexModal"
        title={title}
        buttonText="Add"
        onClick={this.onClick}
      >
        <form>
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

AddPokedexModal.propTypes = {
  pokemon: PropTypes.object.isRequired,
  onAddClick: PropTypes.func.isRequired,
}