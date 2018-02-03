
const initialState = {
  portfolio_assets: [],
  selected_portfolio_asset: undefined
};

export default function PortfolioReducer(state = initialState, action={}) {
  switch(action.type) {
    case 'PORTFOLIO_ASSETS_FETCHED':
      return {
        ...state,
        portfolio_assets: action.payload.portfolio_assets
      }
    case 'SET_SELECTED_PORTFOLIO_ASSET':
      return {
        ...state,
        selected_portfolio_asset: action.payload
      }
    default:
      return state
  }
}
