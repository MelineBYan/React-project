import {
  CHANGE_SEARCH_VALUE,
  SET_DROPDOWN_VALUE,
  SET_DATEPICKER_DATE,
  RESET_SEARCH_DATA,
  TOGGLE_CLICK,
} from "../../Utils/Constants";

const initialState = {
  status: null,
  search: "",
  create_lte: null,
  create_gte: null,
  complete_lte: null,
  complete_gte: null,
  sort: null,
  click: false,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SEARCH_VALUE: {
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value,
      };
    }
    case TOGGLE_CLICK: {
      return {
        ...state,
        click: action.payload,
      };
    }
    case SET_DROPDOWN_VALUE: {
      const [name, value] = action.payload;
      return {
        ...state,
        [name]: value,
      };
    }
    case SET_DATEPICKER_DATE: {
      const [name, value] = action.payload;
      return {
        ...state,
        [name]: value,
      };
    }
    case RESET_SEARCH_DATA: {
      return initialState;
    }

    default:
      return state;
  }
};

export default searchReducer;
