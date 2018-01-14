import axios from 'axios'
import Cable from 'actioncable'

export const markets_fetched = (markets) => {
  return {
    type: 'MARKETS_FETCHED',
    payload: markets
  }
}

export const hocl_fetched = (hocl) => {
  return {
    type: 'HOCL_FETCHED',
    payload: hocl
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
    let new_markets = [...markets]
    new_markets.map((market) =>
      market.pairs.map((pair) => {
        if(pair.id === ticker.pair_id){
          const lastticker = {
            id: ticker.id,
            ask: ticker.ask,
            bid: ticker.bid,
            last: ticker.last,
            volume: ticker.volume
          }
          pair.last_to_be_updated = true
          pair.last_ticker = lastticker
        }else{
          pair.last_to_be_updated = false
        }
      })
    )
    dispatch(received_ticker(new_markets))
  }
}


export const retrieve_ohcl = (market, intent_nb) => {
  return (dispatch) => {
    //let intent_nb = 0
    //let market_param = market.name.split("-").reverse().join("").toLowerCase()
    let market_param = market.name.split("-").join("").toLowerCase()
    let exchange_param = market.pairs[intent_nb].exchange_name
    //let yesterday = ( d => new Date(d.setDate(d.getDate()-1)) )(new Date).getTime()
    //let start_timestamp = new Date().getTime() - (24 * 60 * 60 * 1000)
    //axios.get('https://cors-anywhere.herokuapp.com/https://api.cryptowat.ch/markets/' + exchange_param + '/' + market_param + '/ohlc?periods=900', {responseType: 'json', "Access-Control-Allow-Origin": "*"})
    axios.get('https://cors-anywhere.herokuapp.com/https://api.cryptowat.ch/markets/' + exchange_param + '/' + market_param + '/ohlc?periods=900', {responseType: 'json'})
      .then((response) => {
        let res = response.data
        let json = res["result"][900]
        let arr = []
        json.map((item) => {
          let obj = {
            date: new Date(item[0] * 1000),
            open: item[1],
            high: item[2],
            low: item[3],
            close: item[4],
            volume: item[5],
          }
          arr.push(obj)
        })
        let obj = {}
        obj.market_name = market.name
        obj.charts_data = arr
        dispatch(hocl_fetched(obj))
      })
      .catch((error) => {
        if(error.response.status === 400){
          if(intent_nb < 4){
            intent_nb = intent_nb + 1
            this.retrieve_ohcl(market, intent_nb)
          }
        }
      })
    }
}
