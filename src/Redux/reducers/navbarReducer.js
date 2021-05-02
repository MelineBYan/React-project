import {
  CHANGE_NAVBAR_DIRECTION,
  RESET_NAVBAR_DATA,
  SET_CLICK,
} from "../../Utils/Constants";

const initialState = { width: null, clickMenuBars: false };

const navbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_NAVBAR_DIRECTION: {
      return {
        width: action.payload,
        clickMenuBars: action.payload > 600 ? "false" : "true",
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
