import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class PokemonOptions extends Component {
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
    const thumbStyle = {
      height: '20px',
      width: '20px',
      display: 'inline-block',
      marginRight: 10,
      position: 'relative',
      verticalAlign: 'middle',
    }

    const { option } = this.props
    const imgName = option.value + '.png'
    const imgSrc = require('../../assets/images/' + imgName)

    return (
      <div className={this.props.className}
        onMouseDown={this.onMouseDown}
        onMouseEnter={this.onMouseEnter}
        onMouseMove={this.onMouseMove}
        title={this.props.option.title}
      >
        <img style={thumbStyle} src={imgSrc}/>
        {this.props.children}
      </div>
    )
  }
}

PokemonOptions.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  isFocused: PropTypes.bool,
  isSelected: PropTypes.bool,
  onFocus: PropTypes.func,
  onSelect: PropTypes.func,
  option: PropTypes.object.isRequired,
}