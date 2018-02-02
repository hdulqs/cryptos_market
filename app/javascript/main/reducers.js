import {combineReducers} from 'redux'
import MarketsReducer from '../markets/reducers'
import AssetsReducer from '../assets/reducers'
import SessionsReducer from '../sessions/reducers'

const allReducers = combineReducers({
  MarketsReducer,
  AssetsReducer,
  SessionsReducer
})

export default allReducers
