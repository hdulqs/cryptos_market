export const MARKETS_FETCHED = 'MARKETS_FETCHED'
export const RECEIVED_TICKER = 'RECEIVED_TICKER'

const initialState = {
  markets: []
};

export default function MarketsReducer(state = initialState, action={}) {
  switch(action.type) {
    case 'MARKETS_FETCHED':
      return {
        ...state,
        markets: action.payload
      }
    case 'RECEIVED_TICKER':
      if(state.markets.length === 0)
        console.log("empty markets array")
      return {
        ...state,
        markets: action.payload
      }
    default:
      return state;
  }
}
