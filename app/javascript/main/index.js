import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MarketContainer from '../markets/market_container'
import MarketShow from '../markets/components/market_show'
import { Switch } from 'react-router'
import { BrowserRouter, Route, Layout } from 'react-router-dom'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={MarketContainer} />
        <Route path='/:exchange_name/:market' component={MarketShow} />
      </Switch>
    </BrowserRouter>,
    document.body.appendChild(document.createElement('div'))
  )
})

/*<Route path='/markets/:market' render={({ match }) => (
  <MarketShow market={match.params.market.name} />
)} />*/
