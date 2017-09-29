import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LevelUpCard from './LevelUpCard'

export default class LevelUpCarousel extends Component {
  render() {
    const { data } = this.props
    return (
      <div id="levelUpCarousel" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner" role="listbox">
          <div className="carousel-item active">
            <LevelUpCard data={data} showHeader={true}/>
          </div>
          <div className="carousel-item">
            <LevelUpCard data={data} showHeader={true}/>
          </div>
          <div className="carousel-item">
            <LevelUpCard data={data} showHeader={true}/>
          </div>
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
  data: PropTypes.object.isRequired,
}