import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PokedexTabs from './PokedexTabs'
import PokedexTable from './PokedexTable'
import { PokedexPages } from '../../app/displayOptions'

export default class Pokedex extends Component {
  render() {
    const { trainers, pokedexPage, setPokedexPage } = this.props
    const trainersWithData = trainers.filter(t => t.xpUpdates.length > 0)
    return (
      <div className="mt-3">
        <h3>Pokedex</h3>
        <PokedexTabs pokedexPage={pokedexPage} setPokedexPage={setPokedexPage}/>
        <PokedexTable trainers={trainersWithData} pokedexPage={pokedexPage}/>
      </div>
    )
  }
}

Pokedex.propTypes = {
  trainers: PropTypes.array.isRequired,
  pokedexPage: PropTypes.object.isRequired,
  setPokedexPage: PropTypes.func.isRequired,
}
