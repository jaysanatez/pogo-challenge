import React, { Component } from 'react'

export default class LoadingThrobber extends Component {
  render() {
    return (
      <div className="mt-3">
        <i className="fa fa-circle-o-notch fa-spin" style={{ fontSize: "48px" }}></i>
      </div>
    )
  }
}
