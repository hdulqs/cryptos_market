import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MarketItem from './market_item'
import { Col } from 'react-bootstrap';

const MarketRow = (props) => {
  return(
    <div>
      {
        props.markets.map((market) =>
          <Col xs={12} sm={6} md={6} lg={4} key={market.id}>
            <MarketItem market={market}></MarketItem>
          </Col>
        )
      }
    </div>
  )
}

export default MarketRow
