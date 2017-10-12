import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ToggleHeader extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  getSelectOptions(enumObject) {
    return Object.keys(enumObject).map(e => {
      const obj = enumObject[e]
      return ( 
        <option key={ obj } id={ obj }>
          { obj }
        </option>
      )
    })
  }

  onChange() {
    this.props.onValueChange(this.refs.select.value)
  }

  render() {
    const {
      title,
      enumObject,
      value,
    } = this.props

    const floatLeft = {
      float: 'left',
      marginRight: '1em',
      maxWidth: '150px',
    }

    const headerStyle = {
      overflow: 'hidden',
    }

    return (
      <div style={headerStyle}>
        <h3 style={floatLeft}>{ title }</h3>
        <form>
          <select
            ref="select"
            className="form-control"
            style={floatLeft}
            onChange={this.onChange}
            defaultValue={value}
          >
            { this.getSelectOptions(enumObject) }
          </select>
        </form>
      </div>
    )
  }
}

ToggleHeader.propTypes = {
  title: PropTypes.string.isRequired,
  enumObject: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
}
