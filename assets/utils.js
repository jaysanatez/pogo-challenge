import pokemonData from './pokemon'

export function getPokemonForId(id) {
  var matches = pokemonData.pokemon.filter(p => p.id == id)
  return matches.length ? matches[0] : null
}

export function getPokemonWithTag(tag) {
  return pokemonData.pokemon.filter(p => p.tags.includes(tag))
}

export function getImgSrcForPokemonId(id) {
  return require('./pokemon/' + id + '.png')
}
