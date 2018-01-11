import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Col } from 'react-bootstrap'

const styles = {
  red_flash: {
    color: 'red'
  }
}

/*const MarketPair = (props) => {
  if(props.pair.last_ticker.ask){
    let css = props.pair.last_to_be_updated ? styles.red_flash : {}
    return(
      <div>
      <thead>
        <tr>
          <th>Exchange</th>
          <th>Ask</th>
          <th>Bid</th>
          <th>Last</th>
        </tr>
      </thead>
      <tbody>
        <tr style={css}>
          <td>{props.pair.exchange_name}</td>
          <td>{props.pair.last_ticker.ask}</td>
          <td>{props.pair.last_ticker.bid}</td>
          <td>{props.pair.last_ticker.last}</td>
        </tr>
      </tbody>
      </div>
    )
  }else{
    return(
      <tbody>
        <tr>
        </tr>
      </tbody>
    )
  }
}

export default MarketPair
*/

const MarketPair = (props) => {

  //render(){
    let css = props.pair.last_to_be_updated ? styles.red_flash : {}
    return(
          <tr key={props.pair.id} style={css}>
            <td>{props.pair.exchange_name}</td>
            <td>{props.pair.last_ticker.ask}</td>
            <td>{props.pair.last_ticker.bid}</td>
            <td>{props.pair.last_ticker.last}</td>
          </tr>
    )
  //}

}

export default MarketPair
