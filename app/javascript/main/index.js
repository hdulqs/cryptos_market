import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MainContainer from '../markets/main_container'
import MarketContainer from '../markets/market_container'
import MarketShow from '../markets/components/market_show'
import { Switch } from 'react-router'
import { BrowserRouter, Route, Layout } from 'react-router-dom'

//import {createStore} from 'redux'
import {Provider} from 'react-redux'
import store from './store'

// import allReducers from './reducers';
//
// import { createStore, applyMiddleware, compose } from 'redux'
// import thunk from 'redux-thunk'
//
// import { composeWithDevTools } from 'redux-devtools-extension';
//
//
// const middleware = [thunk]
//
// const composeEnhancers = composeWithDevTools({
//   // Specify name here, actionsBlacklist, actionsCreators and other options if needed
// })
// const store = createStore(allReducers, /* preloadedState, */ composeEnhancers(
//   applyMiddleware(...middleware),
//   // other store enhancers if any
// ))

//const store = compose(
//  applyMiddleware(...middleware)
//)(createStore)(allReducers)

//const store = createStore(allReducers)


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
