import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

import PokemonOption from './PokemonOption'
import PokemonValue from './PokemonValue'
import pokemonData from '../../../assets/pokemon'
import 'react-select/dist/react-select.css'

export default class AddCatchModal extends Component {
  constructor(props) {
    super(props)

    this.selectedValue = null
    this.onSelectChange = this.onSelectChange.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  onSelectChange(value) {
    this.selectedValue = value
    this.forceUpdate()
  }

  onClick() {
    console.log('you selected:', this.selectedValue)
  }

  buildPokemonOptions() {
    var options = []
    pokemonData.pokemon.forEach(p => {
      options.push({
        value: p.id,
        label: p.name
      })
    })

    return options
  }

  render() {
    return (
      <div className="modal fade" id="catchModal" tabIndex="-1" role="dialog" aria-labelledby="catchModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="catchModalLabel">Add Catch</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <Select
                    value={this.selectedValue}
                    valueComponent={PokemonValue}
                    options={this.buildPokemonOptions()}
                    placeholder="Select Pokemon"
                    onChange={this.onSelectChange}
                    optionComponent={PokemonOption}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#catchModal" onClick={this.onClick}>Save</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AddCatchModal.propTypes = {

}
