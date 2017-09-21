import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Constants from './MapConstants'
import { formatDate, LONG_DATE_STRING } from '../../shared/utils'
import { getPokemonForId } from '../../assets/utils'

export default class MapPopup extends Component {
  
  render() {
    const { activeMarker, _catch } = this.props.state
    if (!activeMarker || !_catch)
      return <div/>

    const imgSrc = require('../../assets/pokemon/' + _catch.pokemonId + '.png')
    const dateStr = formatDate(_catch.date, LONG_DATE_STRING)
    const pokemon = getPokemonForId(_catch.pokemonId)

    return (
      <div className="container" style={Constants.popupConstants.popupStyle}>
        <div className="row">
          <img src={imgSrc} style={Constants.popupConstants.imgStyle}/>
          <div className="col" style={Constants.popupConstants.textStyle}>
            You caught a { pokemon.name } in { activeMarker.title } on { dateStr }
          </div>
        </div>
      </div>
    )
  }
}

MapPopup.propTypes = {
  state: PropTypes.object,
}
