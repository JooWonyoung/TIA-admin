// action type
// constant
const ADD_FILTER = 'userFilter/ADD_FILTER';
const INITIALIZE_FILTER = 'userFilter/INITIALIZE_FILTER';

// action creater
export const addUserFilter = (key, value) => {
  return {
    type: ADD_FILTER,
    key: key,
    value: value,
  };
};

export const initializeUserFilter = () => {
  return {
    type: INITIALIZE_FILTER,
  };
};

// reducers
export const INITIAL_STATE = {
  level: '',
  name: '',
  nickname: '',
  email: '',
  hp: '',
  code: '',
  nation: '',
  start_at: '',
  end_at: '',
  blind: '',
};

const userFilterReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_FILTER:
      return { ...prevState, [action.key]: action.value };

    case INITIALIZE_FILTER:
      return INITIAL_STATE;

    default:
      return prevState;
  }
};

export default userFilterReducer;
