import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ProfileTable extends Component {
  renderHeader(titles) {
  	var ths = []
    titles.forEach(t => {
      ths.push(
        <th key={ t }>{ t }</th>
      )
    })

    return (
      <thead>
        <tr>
          { ths }
        </tr>
      </thead>
    )
  }

  renderBody(data, getRowFunc) {
  	var rows = data.map(d => getRowFunc(d))
  	return (
      <tbody>
       { rows }    
      </tbody>
  	)
  }

  render() {
  	const {
  	  headerTitles,
  	  data,
  	  emptyText,
  	  getRowFunc,
  	} = this.props
  	
  	if (!data.length) {
      return (<p className="mt-3 text-center">{ emptyText }</p>)
    }

    const tableStyle = {
      maxHeight: '250px',
      overflow: 'auto',
    }

  	return (
      <div className="mt-3" style={tableStyle}>
        <table className="table table-hover table-sm">
          { this.renderHeader(headerTitles) }
          { this.renderBody(data, getRowFunc) }
        </table>
      </div>
    )
  }
}

ProfileTable.propTypes = {
  headerTitles: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  emptyText: PropTypes.string.isRequired,
  getRowFunc: PropTypes.func.isRequired,
}
