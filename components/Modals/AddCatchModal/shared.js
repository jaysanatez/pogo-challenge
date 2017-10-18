export const imgStyle = {
  height: '20px',
  width: '20px',
  display: 'inline-block',
  marginRight: 10,
  position: 'relative',
  verticalAlign: 'middle',
}

export const getSrcForPokemonId = id => {
  if (id > 251) // until I get the gen. 3 assets
    return null

  return require('../../../assets/pokemon/' + id + '.png')
}
