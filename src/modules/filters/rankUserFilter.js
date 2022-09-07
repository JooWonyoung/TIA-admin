// action type
// constant
const ADD_FILTER = 'rankUserFilter/ADD_FILTER';
const INITIALIZE_FILTER = 'rankUserFilter/INITIALIZE_FILTER';

// action creater
export const addRankUserFilter = (key, value) => {
  return {
    type: ADD_FILTER,
    key: key,
    value: value,
  };
};

export const initializeRankUserFilter = () => {
  return {
    type: INITIALIZE_FILTER,
  };
};

// reducers

export const INITIAL_STATE = {
  top_rank_count: 10,
  email: '',
  code: '',
  status: '',
  provider: '',
  nation: '',
  ch: '',
  order: 'createAt',
  sort: 'desc',
};

const rankUserFilterReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_FILTER:
      return { ...prevState, [action.key]: action.value };

    case INITIALIZE_FILTER:
      return INITIAL_STATE;

    default:
      return prevState;
  }
};

export default rankUserFilterReducer;
