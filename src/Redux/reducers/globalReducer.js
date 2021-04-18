import {
  SET_ERROR,
  SET_LOADING,
  RESET_GLOBAL_DATA,
  SET_SUCCESS,
} from "../../Utils/Constants";

const initialState = {
  successMessage: null,
  errorMessage: null,
  loading: false,
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR: {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }
    case SET_SUCCESS: {
      return {
        ...state,
        successMessage: action.payload,
      };
    }
    case SET_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case RESET_GLOBAL_DATA: {
      return initialState;
    }
    default:
      return state;
  }
};

export default globalReducer;
