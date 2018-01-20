import React, { Component } from 'react'
import MarketContainer from './containers/market_container'
import MarketsNavBar from './markets_nav_bar'

const MarketsApp = () => {
  return (
    <nav>
      <MarketsNavBar />
      <MarketContainer />
    </nav>
  )
}

export default MarketsApp
