import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Constants from './MapConstants'
import { getPokemonForId } from '../../../assets/utils'

export default class MapPopup extends Component {
  
  render() {
    const { activeMarker, _catch } = this.props.state
    if (!activeMarker || !_catch)
      return <div/>

    const imgSrc = require('../../../assets/pokemon/' + _catch.pokemonId + '.png')
    const pokemon = getPokemonForId(_catch.pokemonId)

    return (
      <div className="container" style={Constants.popupConstants.popupStyle}>
        <div className="row">
          <img src={imgSrc} style={Constants.popupConstants.imgStyle}/>
          <div className="col" style={Constants.popupConstants.textStyle}>
            { pokemon.name } was caught in { activeMarker.title } on { _catch.date }.
          </div>
        </div>
      </div>
    )
  }
}

MapPopup.propTypes = {
  state: PropTypes.object,
}
