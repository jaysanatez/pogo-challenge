// data format:
// {
// 	 <pokemon.id>: {
//     <trainer.username>: <dateStr>,
//     <trainer.username>: <dateStr>,, 
//   }, 
//   <pokemon.id>: {
//     <trainer.username>: <dateStr>,
//     <trainer.username>: <dateStr>, 
//   }
// }]
//
// if trainer has caught the pokemon, data[pokemon.id][trainer.username] is the date string
// if trainer hasn't caught the pokemon, data[pokemon.id][trainer.username] is null

export default function(pokemon, trainers) {
  var data = {}

  pokemon.forEach(p => {
  	var dateStrs = {}
    trainers.forEach(t => {
      var entry = t.pokedex.find(d => d.pokemonId == p.id)
      if (!entry)
        entry = t.catches.find(c => c.pokemonId == p.id)

      if (entry)
      	dateStrs[t.username] = entry.date
    })

  	data[p.id] = dateStrs
  })

  return data
}
