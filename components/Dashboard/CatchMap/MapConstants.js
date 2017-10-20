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
  scrollwheel: false,
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


const popupStyle = {
  width: '100px',
  height: '75px',
}

const textStyle = {
  fontSize: '9pt',
}

const popupConstants = {
  popupStyle,
  textStyle,
}

// marker constants

const size = 40
const pokeballIcon = url => {
  return {
    url,
    scaledSize: {
      width: size,
      height: size,
    },
    anchor: {
      x: size / 2,
      y: size / 2,
    }
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
