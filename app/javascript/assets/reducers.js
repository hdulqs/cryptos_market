//import update from 'immutability-helper'

export const ASSETS_FETCHED = 'ASSETS_FETCHED'

const initialState = {
  assets: [],
  asset_charts_data: {},
  current_page: 0,
  is_assets_loading: true,
  current_tab: {}
};

export default function AssetsReducer(state = initialState, action={}) {
  switch(action.type) {
    case 'ASSETS_FETCHED':
      return {
        ...state,
        assets: state.assets.concat(action.payload.assets),
        current_page: action.payload.page_nb,
        is_assets_loading: false
      }
    // case 'MARKET_SEARCH_FETCHED':
    //   return {
    //     ...state,
    //     assets: action.payload.assets,
    //     is_assets_loading: false
    //   }
    // case 'RECEIVED_TICKER':
    //   return {
    //     ...state,
    //     assets: state.assets.map(market => (market.id === action.payload.market_id) ? action.payload : market)
    //   }
    case 'ASSETS_LOADING':
      return {
        ...state,
        is_assets_loading: action.payload
      }
    default:
      return state
  }
}
