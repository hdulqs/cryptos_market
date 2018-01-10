import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Col } from 'react-bootstrap'

export default class MarketPair extends Component {

  render(){
    return(
      <li>
        <h6>
          {this.props.pair.exchange_name} : {this.props.pair.id}
        </h6>
        <small>{this.props.pair.last_ticker.ask}</small> :
        <small>{this.props.pair.last_ticker.bid}</small> :
        <small>{this.props.pair.last_ticker.last}</small>
      </li>
    )
  }

}
