import React, { Component } from 'react'
import MarketItem from './market_item'

export default class MarketList extends Component {
  render(){
    return(
      <ul>
        {
          this.props.markets.map((market) =>
            <MarketItem key={market.id} market={market}></MarketItem>
          )
        }
      </ul>
    )
  }
}
