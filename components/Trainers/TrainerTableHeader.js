import React, { Component } from 'react'

export default class TrainerTableHeader extends Component {
  render() {
    return (
      <thead>
        <tr>
          <th>Username</th>
          <th>Team</th>
          <th>Status</th>
          <th>Role</th>
          <th># XP Updates</th>
          <th>Pokedex Count</th>
          <th># Catches</th>
          <th>Last Updated</th>
          <th>Actions</th>
        </tr>
      </thead>
    )
  }
}
