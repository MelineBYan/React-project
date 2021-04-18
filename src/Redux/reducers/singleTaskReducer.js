import {
  SET_SINGLETASK,
  SET_ERROR,
  TOGGLE_EDIT,
  RESET_DATA,
} from "../../Utils/Constants";

const initialState = {
  sigleTask: null,
  edit: false,
  errorMessage: null,
};

const singleTaskReduser = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLETASK: {
      return {
        ...state,
        singleTask: action.payload,
      };
    }
    case SET_ERROR: {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }

    case TOGGLE_EDIT: {
      return {
        ...state,
        edit: !state.edit,
      };
    }
    case RESET_DATA: {
      return initialState;
    }
    default:
      return state;
  }
};

export default singleTaskReduser;
