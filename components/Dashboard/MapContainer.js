import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react'

import { googleMapsKey } from '../../config'
import MapStyle from './MapStyle'
import { formatDate, LONG_DATE_STRING } from '../../shared/utils'
import { getPokemonForId } from '../../assets/utils'

export class MapContainer extends Component {
  constructor(props) {
    super(props)

    this.state = { visible: false }
    this.updatePopupState = this.updatePopupState.bind(this)
  }

  updatePopupState(marker, _catch) {
    this.state = {
      showInfoWindow: marker != null,
      activeMarker: marker,
      _catch,
    }

    this.forceUpdate()
  }

  getMarkers(trainer, catches) {
    const size = 30
    const pokeball = {
      url: require('../../assets/misc/pokeball.png'),
      scaledSize: {
        width: size,
        height: size,
      },
      anchor: {
        x: size / 2,
        y: size / 2,
      }
    }

    var markers = []
    catches.filter(c => {
      return c.userId == trainer._id
    }).forEach(c => {
      if (!c.cord)
        return

      markers.push(
        <Marker
          key={c._id}
          title={c.locationName}
          position={c.cord}
          icon={pokeball}
          onClick={ (props, marker) => this.updatePopupState(marker, c) }
        />
      )
    })

    return markers
  }

  getPopupForActiveMarker() {
    const { activeMarker, _catch } = this.state
    if (!activeMarker || !_catch)
      return null

    const imgSize = '75px'
    const containerStyle = {
      maxWidth: '200px',
      height: imgSize,
    }

    const imgSrc = require('../../assets/pokemon/' + _catch.pokemonId + '.png')
    const imgStyle = {
      height: imgSize,
      width: imgSize,
    }

    const textStyle = {
      fontSize: '9pt',
    }

    const dateStr = formatDate(_catch.date, LONG_DATE_STRING)
    const pokemon = getPokemonForId(_catch.pokemonId)

    return (
      <div className="container" style={containerStyle}>
        <div className="row">
          <img src={imgSrc} style={imgStyle}/>
          <div className="col" style={textStyle}>
            You caught a { pokemon.name } in { activeMarker.title } on { dateStr }
          </div>
        </div>
      </div>
    )
  }

  render() {
    const containerStyle = {
      height: '500px',
      width: '100%',
      position: 'relative',
    }

    const style = {
      height: '100%',
      width: '100%',
      position: 'relative',
    }

    const centerOfUSA = {
      lat: 38.8258,
      lng: -96.6852,
    }

    const dontMoveMap = {
      zoomControl: false,
      scaleControl: false,
      scrollwheel: false,
      disableDoubleClickZoom: true,
      draggable: false,
    }

    const { google, trainer, catches } = this.props
    return (
      <Map
        google={google}
        containerStyle={containerStyle}
        style={style}
        initialCenter={centerOfUSA}
        zoom={4}
        styles={MapStyle}
        { ...dontMoveMap }
        onClick={ () => this.updatePopupState(null) }
      >
        { this.getMarkers(trainer, catches) }
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showInfoWindow}
        >
          <div>
            { this.getPopupForActiveMarker() }
          </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
 apiKey: googleMapsKey,
})(MapContainer)