import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MainContainer from '../markets/main_container'
import MarketContainer from '../markets/market_container'
import MarketShow from '../markets/components/market_show'
import { Switch } from 'react-router'
import { BrowserRouter, Route, Layout } from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store'


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={MainContainer} />
          <Route path='/:exchange_name/:market' component={MarketShow} />
        </Switch>
      </BrowserRouter>
    </Provider>,
    document.body.appendChild(document.createElement('div'))
  )
})


/*<Route path='/markets/:market' render={({ match }) => (
  <MarketShow market={match.params.market.name} />
)} />*/
