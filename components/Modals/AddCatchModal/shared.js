export const imgStyle = {
  height: '20px',
  width: '20px',
  display: 'inline-block',
  marginRight: 10,
  position: 'relative',
  verticalAlign: 'middle',
}

export const getSrcForPokemonId = id => {
  return require('../../../assets/images/' + id + '.png')
}
