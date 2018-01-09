import React, { Component } from 'react'
import Cable from 'actioncable'
import axios from 'axios'
import MarketList from './components/market_list'


export default class MarketContainer extends Component {

  constructor(props){
    super(props)
    this.state = {
      markets: []
    }
  }

  componentWillMount() {
    this.createSocket()
    this.getMarkets()
  }

  createSocket = () => {
    let cable = Cable.createConsumer();
    this.chats = cable.subscriptions.create({
      channel: 'TickersChannel'
    }, {
      connected: () => {
        console.log('connnected successfully')
      },
      received: (data) => {
        console.log(data.ticker)
        let pair_ticker = JSON.parse(data.ticker)
        this.updateMarketTicker(pair_ticker)
      }
    });
  }

  getMarkets = () => {
    axios.get('/api/v1/public/markets', {responseType: 'json'})
      .then((response) => {
        //console.log(response)
        this.setMarkets(response.data.markets)
      })
      .catch((error) => {
        console.log(error)
      });
  }

  updateMarketTicker = (ticker) => {
    let new_markets = [...this.state.markets]
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
    this.setState({markets: new_markets})
  }

  setMarkets = (markets) => {
    this.setState({
      markets: markets
    })
  }

  render() {
    return(
      <div>
        <MarketList markets={this.state.markets}></MarketList>
      </div>
    )
  }


}
