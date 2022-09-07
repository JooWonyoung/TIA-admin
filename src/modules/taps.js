// action type

// constant
const CLICK_TAP = 'taps/CLICK_TAP';

// action creater

export const moveTap = (tap) => {
  return {
    type: CLICK_TAP,
    payload: tap,
  };
};

// reducers

export const INITIAL_STATE = 'status';

const tapsReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLICK_TAP:
      return action.payload;

    default:
      return prevState;
  }
};

export default tapsReducer;
