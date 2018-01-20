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
