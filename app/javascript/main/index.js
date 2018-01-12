import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Switch } from 'react-router'
import { Router, Route, Layout } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import MarketApp from '../markets/market_app'
import MarketShow from '../markets/components/market_show'
import history from './history'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path='/' component={MarketApp} />
          <Route path='/:exchange_name/:market' component={MarketShow} />
        </Switch>
      </Router>
    </Provider>,
    document.body.appendChild(document.createElement('div'))
  )
})


/*<Route path='/markets/:market' render={({ match }) => (
  <MarketShow market={match.params.market.name} />
)} />*/
