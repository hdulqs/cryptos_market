import axios from 'axios'
import Cable from 'actioncable'

export const markets_fetched = (markets) => {
  return {
    type: 'MARKETS_FETCHED',
    payload: markets
  }
}

export const received_ticker = (markets) => {
  return {
    type: 'RECEIVED_TICKER',
    payload: markets
  }
}

export const fetch_markets = () => {
  return (dispatch) => {
    axios.get('/api/v1/public/markets', {responseType: 'json'})
      .then((response) => {
        dispatch(markets_fetched(response.data.markets))
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export const update_markets_ticker = (markets, ticker) => {
  return (dispatch) => {
    let new_markets = [...markets]//[...this.state.markets]
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
    dispatch(received_ticker(new_markets))
  }
}

/*export const createSocket = () => {
  return (dispatch, getState) => {
    let cable = Cable.createConsumer()
    cable.subscriptions.create({
        channel: 'TickersChannel'
      }, {
      connected: () => {
        console.log('connnected successfully')
      },
      received: (data) => {
        console.log(data.ticker)
        let pair_ticker = JSON.parse(data.ticker)
        let markets = getState().MarketsReducer.markets
        if(markets.length > 0){
          dispatch(received_ticker(markets, pair_ticker))
        }
        //this.props.update_markets_ticker(this.props.markets, pair_ticker)
        //this.update_ticker(pair_ticker)
        //this.updateMarketTicker(pair_ticker)
      }
    })
  }
}*/
