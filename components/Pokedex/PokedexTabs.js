import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { PokedexPages } from '../../app/displayOptions'

export default class PokedexTabs extends Component {
  constructor(props) {
    super(props)
    this.createTabOnClick = this.createTabOnClick.bind(this)
  }

  createTabOnClick(page) {
    return event => {
      event.preventDefault()

      if (page == this.props.pokedexPage
        || page.disabled) {
        return
      }

      this.props.setPokedexPage(page)
    }
  }

  render() {
    const tabs = []
    const { pokedexPage } = this.props
    
    Object.keys(PokedexPages).forEach(p => {
      const page = PokedexPages[p]
      const classes = 'nav-link' +
        (page.disabled ? ' disabled' : '') +
        (page == pokedexPage ? ' active' : '')

      tabs.push(
        <li key={page.text} className="nav-item">
          <a 
            className={classes}
            href=""
            onClick={this.createTabOnClick(page)}
          >
            { page.text }
          </a>
        </li>
      )
    })

    return (
      <ul className="nav nav-tabs mt-3">
        { tabs }
      </ul>
    )
  }
}

PokedexTabs.propTypes = {
  pokedexPage: PropTypes.object.isRequired,
  setPokedexPage: PropTypes.func.isRequired,
}
