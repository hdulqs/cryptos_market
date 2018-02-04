
const initialState = {
  portfolio_assets: [],
  selected_portfolio_asset: undefined,
  is_add_asset_modal_visible: false,
  errors: {}
};

export default function PortfolioReducer(state = initialState, action={}) {
  switch(action.type) {
    case 'PORTFOLIO_ASSETS_FETCHED':
      return {
        ...state,
        portfolio_assets: action.payload.portfolio_assets
      }
    case 'SHOW_ADD_ASSET_MODAL':
      return {
        ...state,
        is_add_asset_modal_visible: action.payload
      }
    case 'SET_SELECTED_PORTFOLIO_ASSET':
      return {
        ...state,
        selected_portfolio_asset: action.payload
      }
    case 'ADDED_ASSET_TO_PORTFOLIO':
      return {
        ...state,
        portfolio_assets: state.portfolio_assets.concat(action.payload.data)
      }
    case 'ADD_ASSET_ERROR':
      return {
        ...state,
        errors: action.payload.errors
      }
    default:
      return state
  }
}
