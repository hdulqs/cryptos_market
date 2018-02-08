
const initialState = {
  alarms: [],
  is_create_alarm_modal_visible: false,
  errors: {}
};

export default function PortfolioReducer(state = initialState, action={}) {
  switch(action.type) {
    case 'SHOW_CREATE_ALARM_MODAL':
      return {
        ...state,
        is_create_alarm_modal_visible: action.payload,
        errors: {}
      }
    case 'ALARM_CREATED':
      return {
        ...state,
        alarms: state.alarms.concat(action.payload.data.alarm)
      }
    case 'DESTROYED_ALARM':
      return {
        ...state,
        alarms: state.alarms.filter((alarm) => alarm.asset_symbol !== action.payload.asset_symbol)
      }
    case 'USER_ALARMS_FETCHED':
      return {
        ...state,
        alarms: action.payload.alarms
      }
    case 'CREATE_ALARM_ERROR':
      return {
        ...state,
        errors: action.payload.errors
      }
    case 'TOGGLED_ALARM':
      return {
        ...state,
        alarms: state.alarms.map((alarm) => (alarm.asset_symbol === action.payload.data.alarm.asset_symbol) ? action.payload.data.alarm : alarm)
      }
    // case 'EDITED_PORTFOLIO_ASSET':
    //   return {
    //     ...state,
    //     portfolio_assets: state.portfolio_assets.map((asset) => (asset.symbol === action.payload.data.symbol) ? action.payload.data : asset)
    //     //state.markets.map(market => (market.id === action.payload.market_id) ? action.payload : market)
    //   }
    // case 'ADD_ASSET_ERROR':
    //   return {
    //     ...state,
    //     errors: action.payload.errors
    //   }
    // case 'EDIT_ASSET_ERROR':
    //   return {
    //     ...state,
    //     edit_errors: action.payload.errors
    //   }
    // case 'REMOVED_ASSET_FROM_PORTFOLIO':
    //   return {
    //     ...state,
    //     portfolio_assets: state.portfolio_assets.filter((asset) => asset.symbol !== action.payload),
    //     selected_portfolio_asset: state.portfolio_assets.filter((asset) => asset.symbol !== action.payload)[0].symbol
    //   }
    default:
      return state
  }
}
