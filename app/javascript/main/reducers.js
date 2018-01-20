import {combineReducers} from 'redux'
import MarketsReducer from '../markets/reducers'
import AssetsReducer from '../assets/reducers'

const allReducers = combineReducers({
  MarketsReducer,
  AssetsReducer
})

export default allReducers
