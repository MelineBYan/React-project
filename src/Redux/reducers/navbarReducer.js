import {
  CHANGE_NAVBAR_DIRECTION,
  RESET_NAVBAR_DATA,
  SET_CLICK,
} from "../../Utils/Constants";

const initialState = { width: null, clickMenuBars: false };

const navbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_NAVBAR_DIRECTION: {
      const clickMenuBars = state.width > 600 ? "false" : "true";
      return {
        width: action.payload,
        clickMenuBars,
      };
    }
    case SET_CLICK: {
      return {
        ...state,
        clickMenuBars: true,
      };
    }
    case RESET_NAVBAR_DATA: {
      return initialState;
    }
    default:
      return state;
  }
};

export default navbarReducer;
