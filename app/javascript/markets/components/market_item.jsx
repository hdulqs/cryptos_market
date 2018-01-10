import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import MarketPair from './market_pair'

export default class MarketItem extends Component {

  render(){
    return(
      <div>
        <h4>{this.props.market.id} : {this.props.market.name}</h4>
        <ul>
          {
            this.props.market.pairs.map((pair) =>
              <MarketPair key={pair.id} pair={pair}></MarketPair>
            )
          }
        </ul>
      </div>
    )
  }

}
