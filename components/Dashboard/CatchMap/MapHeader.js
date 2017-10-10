import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { MapScopes } from '../../../app/displayOptions'

export default class MapHeader extends Component {
  constructor(props) {
    super(props)
    this.onSelectChange = this.onSelectChange.bind(this)
  }

  getSelectOptions() {
    var options = []

    Object.keys(MapScopes).forEach(s => {
      options.push(
        <option key={ MapScopes[s] } id={ MapScopes[s] }>
          { MapScopes[s] }
        </option>
      )
    })

    return options
  }

  onSelectChange() {
    this.props.setMapScope(this.refs.scope.value)
  }

  render() {
    const floatLeft = {
      float: 'left',
      marginRight: '1em',
      maxWidth: '150px',
    }

    return (
      <div style={{ overflow: "hidden" }}>
        <h3 style={floatLeft}>Catch Map</h3>
        <form>
          <select
            ref="scope"
            className="form-control"
            style={floatLeft}
            onChange={this.onSelectChange}
            defaultValue={this.props.mapScope}
          >
            { this.getSelectOptions() }
          </select>
        </form>
      </div>
    )
  }
}

MapHeader.propTypes = {
  mapScope: PropTypes.string.isRequired,
  setMapScope: PropTypes.func.isRequired,
}
