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
      marginBottom,
    } = this.props

    const divStyle = {
      overflow: 'hidden',
      marginBottom: marginBottom,
    }

    const floatLeft = {
      float: 'left',
      marginRight: '1em',
      maxWidth: '150px',
    }

    return (
      <div style={divStyle}>
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

ToggleHeader.defaultProps = {
	marginBottom: '0px',
}

ToggleHeader.propTypes = {
  title: PropTypes.string.isRequired,
  enumObject: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  marginBottom: PropTypes.string,
}
