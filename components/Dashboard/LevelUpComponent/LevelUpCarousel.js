import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LevelUpCard from './LevelUpCard'

export default class LevelUpCarousel extends Component {
  buildCards(trainers, lastN) {
    var cards = []
    var hasActive = false

    trainers.forEach(t => {
      // have to set exactly 1 to 'active'
      const active = hasActive ? '' : ' active'
      const classes = 'carousel-item' + active
      hasActive = true

      cards.push(
        <div className={classes} key={t.username}>
          <LevelUpCard trainer={t} showHeader={true} lastN={lastN}/>
        </div>
      )
    })

    return cards
  }
  render() {
    const { trainers, lastN } = this.props

    return (
      <div id="levelUpCarousel" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner" role="listbox">
          { this.buildCards(trainers, lastN) }
        </div>
        <a className="carousel-control-prev" href="#levelUpCarousel" role="button" data-slide="prev" style={{ width: "30px" }}>
          <i className="fa fa-chevron-left" style={{ color: "#ccc" }}></i>
        </a>
        <a className="carousel-control-next" href="#levelUpCarousel" role="button" data-slide="next" style={{ width: "30px" }}>
          <i className="fa fa-chevron-right" style={{ color: "#ccc" }}></i>
        </a>
      </div>
    )
  }
}

LevelUpCard.LevelUpCarousel = {
  trainers: PropTypes.array.isRequired,
  lastN: PropTypes.number.isRequired,
}
