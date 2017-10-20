import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { imgStyle } from './shared'
import { getImgSrcForPokemonId } from '../../../assets/utils'

export default class PokemonValue extends Component {
  render() {
    const { value, title } = this.props.value
    const imgSrc = getImgSrcForPokemonId(value)
    return (
      <div className="Select-value" title={title}>
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
