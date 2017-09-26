import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AsyncCreatable } from 'react-select'
import toTitleCase from 'to-title-case'
import _ from 'underscore'

import { getConfigValue } from '../../../config'
import 'react-select/dist/react-select.css'

const getObjForGeoname = g => {
  var name = g.name
  if (g.adminName1) {
    name += ', ' + g.adminName1
  }

  return {
    id: g.geonameId,
    name,
    lat: g.lat,
    lng: g.lng
  }
}

const greedyFetch = (url, callback) => {
  fetch(url)
    .then(response => response.json())
    .then(json => {
      callback(null, {
        options: json.geonames.map(g => getObjForGeoname(g)),
      })
    })
}

export default class LocationSearchInput extends Component {
  constructor(props) {
    super(props)

    this.selectedLocationValue = null
    this.loadLocations = this.loadLocations.bind(this)
    this.onSelectLocationChange = this.onSelectLocationChange.bind(this)
    this.filterOptions = this.filterOptions.bind(this)
    this.onLocationInputChange = this.onLocationInputChange.bind(this)

    this.lazyFetch = _.debounce(greedyFetch, 500)
  }

  onSelectLocationChange(value) {
    this.selectedLocationValue = value
    this.props.onChange(value)
    this.forceUpdate()
  }

  loadLocations(input, callback) {
    if (!input || input.length < 3) {
      return Promise.resolve({ options: [] })
    }

    const q = encodeURIComponent(input)
    const user = getConfigValue('GEONAMES_API_USER')
    const url = 'https://secure.geonames.org/searchJSON?q=' + q + '&featureClass=P&country=US&fuzzy=0.5&username=' + user
    this.lazyFetch(url, callback)
  }

  onLocationInputChange(value) {
    this.locationInput = value
  }

  filterOptions(options) {
    // only add one create option
    if (options.some(o => o.className == 'Select-create-option-placeholder')) {
      return options
    }

    options.unshift({
      id: 'custom',
      name: toTitleCase(this.locationInput || ''),
      className: 'Select-create-option-placeholder',
    })

    return options
  }

  render() {
    return (
      <div className="form-group">
        <AsyncCreatable
          value={this.selectedLocationValue}
          onChange={this.onSelectLocationChange}
          loadOptions={this.loadLocations}
          placeholder="Where did you catch it?"
          filterOptions={this.filterOptions}
          onInputChange={this.onLocationInputChange}
          valueKey="id"
          labelKey="name"
          autoload={false}
        />
      </div>
    )
  }
}

LocationSearchInput.propTypes = {
  onChange: PropTypes.func,
}
