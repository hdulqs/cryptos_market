import {combineReducers} from 'redux'
import MarketsReducer from '../markets/reducers'
import AssetsReducer from '../assets/reducers'
import SessionsReducer from '../sessions/reducers'
import RegistrationsReducer from '../registrations/reducers'
import PortfolioReducer from '../portfolio/reducers'
import AlarmsReducer from '../alarms/reducers'

const allReducers = combineReducers({
  MarketsReducer,
  AssetsReducer,
  SessionsReducer,
  RegistrationsReducer,
  AlarmsReducer,
  PortfolioReducer
})

export default allReducers
