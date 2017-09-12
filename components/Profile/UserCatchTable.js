import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class UserCatchTable extends Component {

  onAddCatchClick(event) {
    event.preventDefault()
  }

  renderCatchTable(catches) {
  	if (!catches.length) {
      return (<p className="mt-3 text-center">No catches recorded.</p>)
    }

  	return null
  }

  render() {
  	const { catches } = this.props
    return (
      <div>
        { this.renderCatchTable(catches) }
        <div className="row justify-content-end mt-3 mr-1">
          <a href="#" data-toggle="modal" data-target="#catchModal" onClick={this.onAddCatchClick.bind(this)}>Add Catch</a>
        </div>
      </div>
    )
  }
}

UserCatchTable.propTypes = {
  catches: PropTypes.array.isRequired,
}