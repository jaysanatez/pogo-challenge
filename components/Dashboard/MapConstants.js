// map constants

const containerStyle = {
  height: '500px',
  width: '100%',
  position: 'relative',
}

const mapStyle = {
  height: '100%',
  width: '100%',
  position: 'relative',
}

const centers = {
  USA: {
    lat: 38.8258,
    lng: -96.6852,
  },
  World: {
    lat: 27.5,
    lng: 0.05,
  },
}

const dontMoveMap = {
  zoomControl: false,
  scaleControl: false,
  scrollwheel: false,
  disableDoubleClickZoom: true,
  draggable: false,
}

const zoomLevels = {
  USA: 4,
  World: 2,
}

const mapConstants = {
  containerStyle,
  mapStyle,
  centers,
  dontMoveMap,
  zoomLevels,
}

// popup constants

const imgSize = '75px'
const popupStyle = {
  maxWidth: '200px',
  height: imgSize,
}

const imgStyle = {
  height: imgSize,
  width: imgSize,
}

const textStyle = {
  fontSize: '9pt',
}

const popupConstants = {
  popupStyle,
  imgStyle,
  textStyle,
}

// marker constants

const size = 30
const pokeballIcon = {
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

const markerConstants = {
 pokeballIcon,
}

export default {
  mapConstants,
  popupConstants,
  markerConstants,
}
