import React, { Component } from 'react'
import Cable from 'actioncable'
import axios from 'axios'
import MarketList from './components/market_list'
import { Grid } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as markets_actions from './actions'
import {ActionCable} from 'react-actioncable-provider'
import store from './../main/store'

class MarketContainer extends Component {

  constructor(props){
    super(props)
    const store = store
    //this.state = {
    //  markets: []
    //}
    //this.store = store

  }

  componentDidMount(){
    //this.props.createSocket()
    this.props.fetch_markets()
    //this._self = this
    this.createSocket()
    /*const self = this;
    this.subscription = this.context.cable.subscriptions.create(
      'TickersChannel',
      {
        received (data) {
          console.log(data)
        },
        connected(){
          console.log("connected")
        }
      }
    )*/

  }

  //onConnected(){
  //  console.log('connected to TickersChannel')
  //}

  /*createSocket() {
    const self = this
    this.cable = Cable.createConsumer()
    this.cable.subscriptions.create({
        channel: 'TickersChannel'
      }, {
      connected: () => {
        console.log('connnected successfully')
      },
      received: (data) => {
        console.log(data.ticker)
        let pair_ticker = JSON.parse(data.ticker)
        //this.props.update_markets_ticker(this.props.markets, pair_ticker)
        //this.update_ticker(pair_ticker)
        //this.updateMarketTicker(pair_ticker)
      }
    })
  }*/

  createSocket() {
    //let cable = Cable.createConsumer();
    let self = this
    Cable.createConsumer().subscriptions.create({
        channel: 'TickersChannel'
      }, {
      connected: () => {
        console.log('connnected successfully')
      },
      received: (data) => {
        console.log(data.ticker)
        let pair_ticker = JSON.parse(data.ticker)

        //this.updateMarketTicker(pair_ticker)
        this.props.update_market_ticker(_this3.props.markets, pair_ticker)
      }
    })
  }

  /*update_ticker = (ticker) => {
    console.log(ticker)
    console.log(this.props)
    console.log(this.state)
  }*/

  updateMarketTicker(ticker) {
    //const new_markets = Object.assign({}, this.state.markets)
    // ...this.state.markets is always null
    let new_markets = [...this.props.markets]
    if(new_markets.length > 0){
      new_markets.map((market) =>
        market.pairs.map((pair) => {
          if(pair.id === ticker.pair_id){
            const lastticker = {
              id: ticker.id,
              ask: ticker.ask,
              bid: ticker.bid,
              last: ticker.last
            }
            pair.last_ticker = lastticker
          }
        })
      )
      //this.setState({markets: new_markets})
    }
  }


  render() {
    return(
      <Grid>
        <MarketList markets={this.props.markets}></MarketList>
      </Grid>
    )
  }


}

const mapStateToProps = (state) => {
  return {
    markets: state.MarketsReducer.markets
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(markets_actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketContainer)
