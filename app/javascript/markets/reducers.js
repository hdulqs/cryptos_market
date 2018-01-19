//import update from 'immutability-helper'

export const MARKETS_FETCHED = 'MARKETS_FETCHED'
export const RECEIVED_TICKER = 'RECEIVED_TICKER'

const initialState = {
  markets: [],
  charts_data: {},
  current_page: 0,
  is_markets_loading: true,
  current_tab: {}
};

export default function MarketsReducer(state = initialState, action={}) {
  switch(action.type) {
    case 'MARKETS_FETCHED':
      return {
        ...state,
        markets: state.markets.concat(action.payload.markets),
        current_page: action.payload.page_nb,
        is_markets_loading: false
      }
    case 'MARKET_SEARCH_FETCHED':
      return {
        ...state,
        markets: action.payload.markets,
        is_markets_loading: false
      }
    case 'RECEIVED_TICKER':
      return {
        ...state,
        markets: state.markets.map(market => (market.id === action.payload.market_id) ? action.payload : market)
      }
    case 'MARKETS_LOADING':
      return {
        ...state,
        is_markets_loading: action.payload
      }
    case 'HOCL_FETCHED':
      return {
        ...state,
        charts_data: {
          ...state.charts_data,
          [action.payload.market_name]: action.payload.charts_data
        }
      }
    case 'SET_TAB':
      return {
        ...state,
        current_tab: {
          ...state.current_tab,
          [action.payload.market_id]: action.payload.tab
        }
      }
    default:
      return state;
  }
}
