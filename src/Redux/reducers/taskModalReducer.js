import {
  CHANGE_MODAL_FORM,
  SET_DATE,
  RESET_MODAL_DATA,
  SET_INITIALSTATE,
} from "../../Utils/Constants";

const initialState = {
  title: "",
  description: "",
  date: new Date(),
};

const taskModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIALSTATE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case CHANGE_MODAL_FORM: {
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value,
      };
    }
    case SET_DATE: {
      return { ...state, date: action.payload };
    }
    case RESET_MODAL_DATA: {
      return initialState;
    }
    default:
      return state;
  }
};

export default taskModalReducer;
