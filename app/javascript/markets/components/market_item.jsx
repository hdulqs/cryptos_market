import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MarketShow from './market_show'

export default class MarketItem extends Component {
  render(){
    return(
      <li>
        <div>
          {this.props.market.id}: {this.props.market.name}
          <ul>
            {
              this.props.market.pairs.map((pair) =>
                <li key={pair.id}>
                  {pair.exchange_name} ===>
                  Ask:{pair.last_ticker.ask} : Bid:{pair.last_ticker.bid} : Last:{pair.last_ticker.last}
                  <Link to={`/${pair.exchange_name}/${this.props.market.name}`}>{this.props.market.name}</Link>
                </li>
              )
            }
          </ul>
        </div>
      </li>
    )
  }
}
