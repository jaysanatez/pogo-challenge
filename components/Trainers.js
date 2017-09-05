import React, { Component } from 'react'

export default class Trainers extends Component {
  render() {
  	this.props.fetchTrainers()

    return (
      <h1>TRAINERS</h1>
    )
  }
}
