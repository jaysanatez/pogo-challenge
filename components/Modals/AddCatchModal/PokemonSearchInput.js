import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

import PokemonOption from './PokemonOption'
import PokemonValue from './PokemonValue'
import pokemonData from '../../../assets/pokemon'

export default class PokemonSearchInput extends Component {
  constructor(props) {
    super(props)

    this.selectedPokemonValue = null
    this.onSelectPokemonChange = this.onSelectPokemonChange.bind(this)
  }

  buildPokemonOptions() {
    return pokemonData.pokemon.map(p => {
      return {
        value: p.id,
        label: p.name,
        disabled: p.disabled,
      }
    })
  }

  onSelectPokemonChange(value) { 
    this.selectedPokemonValue = value
    this.props.onChange(value)
    this.forceUpdate()
  }

  render() {
    return (
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
    )
  }
}

PokemonSearchInput.propTypes = {
  onChange: PropTypes.func,
}
