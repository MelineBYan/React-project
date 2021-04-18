import { SET_FORMDATA, RESET_CONTACT_DATA } from "../../Utils/Constants";
import {
  maxLength,
  minLength,
  validateEmail,
  isRequired,
} from "../../Utils/helpers/Validators";

const maxLength50 = maxLength(50);
const maxLength100 = maxLength(100);
const minLength1 = minLength(1);

const initialState = {
  name: {
    value: "",
    error: null,
    valid: false,
  },
  email: {
    value: "",
    error: null,
    valid: false,
  },
  message: {
    value: "",
    error: null,
    valid: false,
  },
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FORMDATA: {
      const { name, value } = action.payload;
      let valid = true;
      let error =
        isRequired(value.trim(), name) ||
        minLength1(value.trim()) ||
        ((name === "name" || name === "email") && maxLength50(value.trim())) ||
        (name === "email" && validateEmail(value.trim())) ||
        (name === "message" && maxLength100(value.trim()));

      if (!error) valid = true;
      return {
        ...state,
        [name]: { value, error, valid },
      };
    }
    case RESET_CONTACT_DATA: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default contactReducer;
