
const initialState = {
  exchanges: []
};

export default function ExchangesReducer(state = initialState, action={}) {
  switch(action.type) {
    case 'EXCHANGES_FETCHED':
      return {
        ...state,
        exchanges: action.payload.exchanges
      }

    default:
      return state
  }
}
