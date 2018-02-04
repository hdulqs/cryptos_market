import axios from 'axios'

export const portfolio_assets_fetched = (portfolio_assets) => {
  return {
    type: 'PORTFOLIO_ASSETS_FETCHED',
    payload: portfolio_assets
  }
}

export const set_selected_portfolio_asset = (symbol) => {
  return {
    type: 'SET_SELECTED_PORTFOLIO_ASSET',
    payload: symbol
  }
}

export const fetch_portfolio_assets = (jwt_token) => {
  return (dispatch) => {
    axios.get('/api/v1/private/portfolio', {headers: {Authorization: jwt_token, responseType: 'json'}})
      .then((response) => {
        dispatch(portfolio_assets_fetched({portfolio_assets: response.data.data.portfolio_assets}))
        if(response.data.data.portfolio_assets.length){          
          dispatch(set_selected_portfolio_asset(response.data.data.portfolio_assets[0].symbol))
          dispatch(retrieve_assets_ohcl_candle(response.data.data.portfolio_assets[0].symbol, "7D"))
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export const update_selected_portfolio_asset = (symbol) => {
  return (dispatch) => {
    dispatch(set_selected_portfolio_asset(symbol))
  }
}





















export const assets_ohcl_fetched = (obj) => {
  return {
    type: 'ASSETS_OHCL_FETCHED',
    payload: obj
  }
}

// Used by Assets Show Candle chart
export const retrieve_assets_ohcl_candle = (symbol, time_scale) => {
  return (dispatch) => {
    //let symbol = symbol
    // histohour ==> 7 last days with 3 hours step
    // histoday ==> 7 last months with 3 days step
    // histominute ==> 3 last hours with 3 minutes step
    // aggreagte is step
    if(symbol === 'MIOTA'){
      symbol = 'IOT'
    }

    let limit = 60
    let request_type = 'histohour'
    let step = 3
    if(time_scale === '7d'){
      limit = 60
      step = 3
      request_type = 'histohour'
    }else if (time_scale === '1d') {
      limit = 96
      step = 15
      request_type = 'histominute'
    }else if (time_scale === '6h') {
      limit = 120
      step = 3
      request_type = 'histominute'
    }
    else if (time_scale === '1m') {
      limit = 120
      step = 6
      request_type = 'histohour'
    }
    else if (time_scale === '7D') {
      limit = 2000
      step = 1
      request_type = 'histohour'
    }

    axios.get('https://min-api.cryptocompare.com/data/' + request_type + '?tsym=USD&limit=' + limit + '&fsym=' + symbol + '&aggregate=' + step, {responseType: 'json'})
      .then((response) => {
        let res = response.data
        let json_arr = res["Data"]
        let arr = []
        json_arr.forEach((item) => {
          let obj = {
            date: new Date(item.time * 1000),
            open: item.open,
            high: item.high,
            low: item.low,
            close: item.close,
            volume: item.volumeto + item.volumefrom
          }
          arr.push(obj)
        })
        let obj = {}
        obj.market_name = symbol
        obj.charts_data = arr
        dispatch(assets_ohcl_fetched(obj))
        //this.setState({chart_data: arr})
      })
      .catch((error) => {
        if(error.response.status === 429){
          return false
        }
        if(error.response.status === 400){
          //if(intent_nb < 4){
          //  intent_nb = intent_nb + 1
          //  this.retrieve_ohcl(market, intent_nb)
          //}
        }
      })
  }
}
