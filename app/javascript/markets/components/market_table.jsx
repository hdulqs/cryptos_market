import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Col, Table } from 'react-bootstrap'
import MarketPair from './market_pair'

const styles = {
  red_flash: {
    color: 'red'
  }
}


const MarketTable = (props) => {
    //this.css_tilde = (pair) => {
    //  return pair.last_to_be_updated ? styles.red_flash : {}
    //}
    let pairs = props.pairs.map((pair) => {
      let last_value = parseFloat(pair.last_ticker.last)
      let last_ticker_value = isNaN(last_value) ? 0 : last_value
      return {
        pair_id: pair.id,
        ticker: last_ticker_value,
        pair: pair
      }
    })
    let ordered_pairs = pairs.sort((a, b) => b.ticker - a.ticker)
    let pairs_array = ordered_pairs.map((pair) => pair.pair)
    return(
      <Table condensed responsive>
        <thead>
          <tr>
            <th>Exchange</th>
            <th>Last</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {
            pairs_array.map((pair) =>
              <MarketPair key={pair.id} pair={pair}></MarketPair>
            )
          }
        </tbody>
      </Table>
    )

}

export default MarketTable


/*export default class MarketPair extends Component {

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

}*/
