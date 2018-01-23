
import React, { Component } from 'react'
import ExchangesContainer from './containers/exchanges_container'
import ExchangesNavBar from './exchanges_nav_bar'

const ExchangesApp = () => {
  return (
    <nav>
      <ExchangesNavBar />
      <ExchangesContainer />
    </nav>
  )
}

export default ExchangesApp
