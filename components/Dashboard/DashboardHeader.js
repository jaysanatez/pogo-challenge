import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { UserScopes } from '../../app/displayOptions'

export default class DashboardHeader extends Component {
  constructor(props) {
    super(props)
    this.onSelectChange = this.onSelectChange.bind(this)
  }

  getSelectOptions() {
    var options = []

    Object.keys(UserScopes).forEach(s => {
      options.push(
        <option key={ UserScopes[s] } id={ UserScopes[s] }>
          { UserScopes[s] }
        </option>
      )
    })

    return options
  }

  onSelectChange() {
    this.props.setUserScope(this.refs.scope.value)
  }

  render() {
    const floatLeft = {
      float: 'left',
      marginRight: '1em',
      maxWidth: '150px',
    }

    return (
      <div style={{ overflow: "hidden", marginBottom: "20px" }}>
        <h3 style={floatLeft}>Dashboard</h3>
        <form>
          <select
            ref="scope"
            className="form-control"
            style={floatLeft}
            onChange={this.onSelectChange}
            defaultValue={this.props.userScope}
          >
            { this.getSelectOptions() }
          </select>
        </form>
      </div>
    )
  }
}

DashboardHeader.propTypes = {
  userScope: PropTypes.string.isRequired,
  setUserScope: PropTypes.func.isRequired,
}
