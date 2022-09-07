import moment from 'moment';
import 'moment/locale/ko';
// action type
// constant
const ADD_FILTER = 'preReservFilter/ADD_FILTER';
const INITIALIZE_FILTER = 'preReservFilter/INITIALIZE_FILTER';

// action creater
export const addPreReservFilter = (key, value) => {
  return {
    type: ADD_FILTER,
    key: key,
    value: value,
  };
};

export const initializePreReservFilter = () => {
  return {
    type: INITIALIZE_FILTER,
  };
};

// reducers
export const INITIAL_STATE = {
  top_rank_count: '',
  time_zone: 'KTC',
  channels: '',
  start_at: moment().day(-90).format('YYYY-MM-DD'),
  end_at: moment().format('YYYY-MM-DD'),
};

const preReservFilterReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_FILTER:
      return { ...prevState, [action.key]: action.value };

    case INITIALIZE_FILTER:
      return INITIAL_STATE;

    default:
      return prevState;
  }
};

export default preReservFilterReducer;
