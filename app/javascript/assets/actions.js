import axios from 'axios'
import Cable from 'actioncable'


export const assets_fetched = (assets) => {
  return {
    type: 'ASSETS_FETCHED',
    payload: assets
  }
}

export const asset_search_fetched = (assets) => {
  return {
    type: 'ASSET_SEARCH_FETCHED',
    payload: assets
  }
}


export const assets_loading = (is_loading) => {
  return {
    type: 'ASSETS_LOADING',
    payload: is_loading
  }
}

export const assets_ohcl_fetched = (obj) => {
  return {
    type: 'ASSETS_OHCL_FETCHED',
    payload: obj
  }
}


export const fetch_assets = (page_nb) => {
  return (dispatch) => {
    axios.get('/api/v1/public/asset_infos?page=' + page_nb, {responseType: 'json'})
      .then((response) => {
        dispatch(assets_fetched({page_nb: page_nb, assets: response.data.asset_infos}))
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export const set_assets_loading = (is_loading) => {
  return (dispatch) => {
    dispatch(assets_loading(is_loading))
  }
}


export const asset_search = (value) => {
  return (dispatch) => {
    axios.get('/api/v1/public/asset_infos?asset_search=' + value, {responseType: 'json'})
      .then((response) => {
        dispatch(asset_search_fetched({page_nb: 0, assets: response.data.asset_infos}))
      })
      .catch((error) => {
        console.log(error)
      })
  }
}


// Used by Assets listing line chart
export const retrieve_assets_ohcl = (symbol, time_scale) => {
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
      limit = 24
      step = 1
      request_type = 'histohour'
    }else if (time_scale === '6h') {
      limit = 120
      step = 3
      request_type = 'histominute'
    }
    else if (time_scale === '1m') {
      limit = 30
      step = 1
      request_type = 'histoday'
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
