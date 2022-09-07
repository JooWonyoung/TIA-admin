// action type

// constant
const COLLAPSE = 'nav/COLLAPSE';
const MOVE_TAP = 'nav/MOVE_TAP';

// action creater
export const collapseNav = () => {
  return {
    type: COLLAPSE,
  };
};
export const moveTap = (page) => {
  return {
    type: MOVE_TAP,
    payload: page,
  };
};

// reducers

export const INITIAL_STATE = {
  collapsed: false,
  page: '',
};

const navReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case COLLAPSE:
      return { ...prevState, collapsed: !prevState.collapsed };

    case MOVE_TAP:
      return { ...prevState, page: action.payload };

    default:
      return prevState;
  }
};

export default navReducer;
