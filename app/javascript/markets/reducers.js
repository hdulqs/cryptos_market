//import update from 'immutability-helper'

export const MARKETS_FETCHED = 'MARKETS_FETCHED'
export const RECEIVED_TICKER = 'RECEIVED_TICKER'

const initialState = {
  markets: [],
  charts_data: {}
};

export default function MarketsReducer(state = initialState, action={}) {
  switch(action.type) {
    case 'MARKETS_FETCHED':
      return {
        ...state,
        markets: action.payload
      }
    case 'RECEIVED_TICKER':
      return {
        ...state,
        markets: action.payload
      }
    case 'HOCL_FETCHED':
      return {
        ...state,
        charts_data: {
          ...state.charts_data,
          [action.payload.market_name]: action.payload.charts_data
        }
      }
    default:
      return state;
  }
}
