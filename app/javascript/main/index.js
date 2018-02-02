import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Switch } from 'react-router'
import { Router, Route, Layout } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import MarketsApp from '../markets/markets_app'
import AssetsApp from '../assets/assets_app'
import SignInApp from '../sessions/sign_in_app'
import ExchangesApp from '../exchanges/exchanges_app'
import AboutApp from '../about/about_app'
import PortfolioApp from '../portfolio/portfolio_app'
import AssetShow from '../assets/components/asset_show'
import MarketShow from '../markets/components/market_show'
import history from './history'
import ReactGA from 'react-ga'
import withTracker from './with_tracker'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path='/' component={withTracker(AssetsApp)} />
          <Route path='/sign_in' component={withTracker(SignInApp)} />
          <Route path='/asset-pairs' component={withTracker(MarketsApp)} />
          <Route exact path='/exchanges' component={withTracker(ExchangesApp)} />
          <Route exact path='/about' component={withTracker(AboutApp)} />
          <Route exact path='/portfolio' component={withTracker(PortfolioApp)} />
          <Route exact path='/:symbol' component={withTracker(AssetShow)} />
          <Route path='/:exchange_name/:market' component={withTracker(MarketShow)} />
        </Switch>
      </Router>
    </Provider>,
    document.body.appendChild(document.createElement('div'))
  )
})
