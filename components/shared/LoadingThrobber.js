import React, { Component } from 'react'

export default class LoadingThrobber extends Component {
  render() {
  	const style = {
  	  fontSize: '48px',
  	}

    return (
      <div className="mt-3">
        <i className="fa fa-circle-o-notch fa-spin" style={style}></i>
      </div>
    )
  }
}
