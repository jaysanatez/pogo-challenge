import pokemonData from './pokemon'

export function getPokemonForId(id) {
  var matches = pokemonData.pokemon.filter(p => p.id == id)
  return matches.length ? matches[0] : null
}