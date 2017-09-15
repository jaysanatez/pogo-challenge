import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select, { AsyncCreatable } from 'react-select'
import toTitleCase from 'to-title-case'
import Moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-select/dist/react-select.css'

import PokemonOption from './PokemonOption'
import PokemonValue from './PokemonValue'
import ModalWrapper from '../ModalWrapper'
import pokemonData from '../../../assets/pokemon'
import { formatDate, LONG_DATE_STRING } from '../../../shared/utils'

export default class AddCatchModal extends Component {
  constructor(props) {
    super(props)

    this.selectedPokemonValue = null
    this.selectedLocationValue = null
    this.locationInput = null
    this.selectedDay = Moment()

    this.onSelectPokemonChange = this.onSelectPokemonChange.bind(this)
    this.onSelectLocationChange = this.onSelectLocationChange.bind(this)
    this.filterOptions = this.filterOptions.bind(this)
    this.onLocationInputChange = this.onLocationInputChange.bind(this)
    this.onDateChange = this.onDateChange.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  onSelectPokemonChange(value) {
    this.selectedPokemonValue = value
    this.forceUpdate()
  }

  onSelectLocationChange(value) {
    this.selectedLocationValue = value
    this.forceUpdate()
  }

  onDateChange(date) {
    this.selectedDay = date
    this.forceUpdate()
  }

  onClick() {
    if (!this.selectedPokemonValue || !this.selectedLocationValue) {
      console.log('invalid')
    }

    const loc = this.selectedLocationValue
    const data = {
      pokemonId: this.selectedPokemonValue.value,
      location: loc,
      date: formatDate(this.selectedDay, LONG_DATE_STRING),
    }

    this.props.onCatchCreate(data)
  }

  buildPokemonOptions() {
    var options = []
    pokemonData.pokemon.forEach(p => {
      options.push({
        value: p.id,
        label: p.name,
        disabled: p.disabled,
      })
    })

    return options
  }

  loadLocations(input, callback) {
    if (!input || input.length < 3) {
      return Promise.resolve({ options: [] })
    }

    const getObjForGeoname = g => {
      var name = g.name
      if (g.adminName1) {
        name += ', ' + g.adminName1
      }

      return {
        id: g.geonameId,
        name,
        lat: g.lat,
        lng: g.lng
      }
    }
    
    const url = 'http://api.geonames.org/searchJSON?q=' + encodeURIComponent(input) + '&featureClass=P&country=US&fuzzy=0.5&username=jsanch'
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        return {
          options: json.geonames.map(g => getObjForGeoname(g)),
        }
      })
  }

  filterOptions(options) {
    // only add one create option
    if (options.some(o => o.className == 'Select-create-option-placeholder')) {
      return options
    }

    options.unshift({
      id: 'custom',
      name: toTitleCase(this.locationInput || ''),
      className: 'Select-create-option-placeholder',
    })

    return options
  }

  onLocationInputChange(value) {
    this.locationInput = value
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
          <div className="form-group">
            <Select
              value={this.selectedPokemonValue}
              valueComponent={PokemonValue}
              options={this.buildPokemonOptions()}
              placeholder="Select Pokemon"
              onChange={this.onSelectPokemonChange}
              optionComponent={PokemonOption}
            />
          </div>
          <div className="form-group">
            <AsyncCreatable
              value={this.selectedLocationValue}
              onChange={this.onSelectLocationChange}
              loadOptions={this.loadLocations}
              placeholder="Where did you catch it?"
              filterOptions={this.filterOptions}
              onInputChange={this.onLocationInputChange}
              valueKey="id"
              labelKey="name"
              autoload={false}
            />
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

AddCatchModal.propTypes = {
  onCatchCreate: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
}
