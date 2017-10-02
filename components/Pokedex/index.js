import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PokedexTabs from './PokedexTabs'
import { PokedexPages } from '../../app/displayOptions'

export default class Pokedex extends Component {
  render() {
    const { pokedexPage, setPokedexPage } = this.props
    return (
      <div className="mt-3">
        <PokedexTabs pokedexPage={pokedexPage} setPokedexPage={setPokedexPage}/>
        <h1>{ pokedexPage.text }</h1>
      </div>
    )
  }
}

Pokedex.propTypes = {
  pokedexPage: PropTypes.object.isRequired,
  setPokedexPage: PropTypes.func.isRequired,
}
