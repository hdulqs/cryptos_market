import React, { Component } from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import history from './../../main/history'

const styles = {
  red_flash: {
    color: 'red' //'#efff00'
  }
}

const MarketPair = (props) => {

  const navigateToShowMarket = () => {
    history.push('/' + props.pair.exchange_name + '/' + props.pair.last_ticker.market_name)
  }

  let css = props.pair.last_to_be_updated ? styles.red_flash : {}
  return(
    <tr key={props.pair.id} style={css} onClick={navigateToShowMarket}>
      <td>{props.pair.exchange_name + props.pair.id}</td>
      <td>{props.pair.last_ticker.last}</td>
      <td>{props.pair.last_ticker.volume}</td>
    </tr>
  )

}

export default MarketPair
