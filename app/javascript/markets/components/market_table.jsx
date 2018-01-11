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
    //let css = props.pair.last_to_be_updated ? styles.red_flash : {}
    this.css_tilde = (pair) => {
      return pair.last_to_be_updated ? styles.red_flash : {}
    }
    return(
      <Table condensed responsive>
        <thead>
          <tr>
            <th>Exchange</th>
            <th>Ask</th>
            <th>Bid</th>
            <th>Last</th>
          </tr>
        </thead>
        <tbody>
          {
            props.pairs.map((pair) =>
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
