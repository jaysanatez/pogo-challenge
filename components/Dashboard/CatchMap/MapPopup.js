import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Constants from './MapConstants'
import { getPokemonForId } from '../../../assets/utils'

export default class MapPopup extends Component {
  
  render() {
    const { activeMarker, _catch, trainerName } = this.props.state
    if (!activeMarker || !_catch)
      return <div/>

    const pokemon = getPokemonForId(_catch.pokemonId)
    return (
      <div className="container" style={Constants.popupConstants.popupStyle}>
        <div className="row" style={Constants.popupConstants.textStyle}>
          { pokemon.name } was caught in { activeMarker.title } on { _catch.date } by { trainerName }.
        </div>
      </div>
    )
  }
}

MapPopup.propTypes = {
  state: PropTypes.object,
}
