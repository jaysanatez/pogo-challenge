import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { imgStyle } from './shared'
import { getImgSrcForPokemonId } from '../../../assets/utils'

export default class PokemonOption extends Component {
  constructor(props) {
    super(props)

    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
  }

  onMouseDown(event) {
    const { onSelect, option } = this.props
    event.preventDefault()
    event.stopPropagation()
    onSelect(option, event)
  }

  onMouseEnter(event) {
    const { onFocus, option } = this.props
    onFocus(option, event)
  }

  onMouseMove(event) {
    const { isFocused, onFocus, option } = this.props
    if (!isFocused)
      onFocus(option, event)
  }

  render() {
    const { option, className, children } = this.props
    const imgSrc = getImgSrcForPokemonId(option.value)
    return (
      <div className={className}
        onMouseDown={this.onMouseDown}
        onMouseEnter={this.onMouseEnter}
        onMouseMove={this.onMouseMove}
        title={option.title}
      >
        <img style={imgStyle} src={imgSrc}/>
        { children }
      </div>
    )
  }
}

PokemonOption.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  isFocused: PropTypes.bool,
  isSelected: PropTypes.bool,
  onFocus: PropTypes.func,
  onSelect: PropTypes.func,
  option: PropTypes.object.isRequired,
}