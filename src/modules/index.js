// sliceReducers => rootReducer
import { combineReducers } from 'redux';
import userFilterReducer from './filters/userFilter';
import navReducer from './nav';
import preUserFilterReducer from './filters/preUserFilter';
import rankUserFilterReducer from './filters/rankUserFilter';
import preReservFilterReducer from './filters/preReservFilter';
import tapsReducer from './taps';

const rootReducers = combineReducers({
  nav: navReducer,
  userFilter: userFilterReducer,
  preUserFilter: preUserFilterReducer,
  rankUserFilter: rankUserFilterReducer,
  preReservFilter: preReservFilterReducer,
  taps: tapsReducer,
});

export default rootReducers;
