import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MarketItem from './market_item'
import { Col } from 'react-bootstrap';

export default class MarketRow extends Component {

  render(){
    return(
      <div>
        {
          this.props.markets.map((market) =>
            <Col xs={3} md={3} key={market.id}>
              <MarketItem market={market}></MarketItem>
  			    </Col>
          )
        }
      </div>
    )
  }
  
}
