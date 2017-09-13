import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { imgStyle, getSrcForPokemonId } from './shared'

export default class PokemonValue extends Component {
  render() {
    const imgSrc = getSrcForPokemonId(this.props.value.value)
    return (
      <div className="Select-value" title={this.props.value.title}>
        <span className="Select-value-label">
          <img style={imgStyle} src={imgSrc}/>
          {this.props.children}
        </span>
      </div>

    )
  }
}

PokemonValue.propTypes = {
  children: PropTypes.node,
  placeHolder: PropTypes.string,
  value: PropTypes.object,
}