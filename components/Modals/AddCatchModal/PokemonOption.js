import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { imgStyle, getSrcForPokemonId } from './shared'

export default class PokemonOption extends Component {
  constructor(props) {
    super(props)

    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
  }

  onMouseDown(event) {
    event.preventDefault()
    event.stopPropagation()
    this.props.onSelect(this.props.option, event)
  }

  onMouseEnter(event) {
    this.props.onFocus(this.props.option, event)
  }

  onMouseMove(event) {
    if (this.props.isFocused) {
      return
    }

    this.props.onFocus(this.props.option, event)
  }

  render() {
    const imgSrc = getSrcForPokemonId(this.props.option.value)
    return (
      <div className={this.props.className}
        onMouseDown={this.onMouseDown}
        onMouseEnter={this.onMouseEnter}
        onMouseMove={this.onMouseMove}
        title={this.props.option.title}
      >
        <img style={imgStyle} src={imgSrc}/>
        {this.props.children}
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