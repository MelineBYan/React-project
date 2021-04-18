// import { contactContext } from "../Context/Context";
import { URL } from "../../Utils/Constants";
import { contactContext } from "../Context";
import { withRouter } from "react-router-dom";
import { useState } from "react";
import {
  maxLength,
  minLength,
  validateEmail,
  isRequired,
} from "../../Utils/helpers/Validators";

const ContactContextProvider = (props) => {
  const maxLength50 = maxLength(50);
  const maxLength100 = maxLength(100);
  const minLength1 = minLength(1);
  const [formData, setFormData] = useState({
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
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    setLoading(true);
    setErrorMessage("");

    const body = {
      name: formData.name.value,
      email: formData.email.value,
      message: formData.message.value,
    };

    fetch(`${URL}/form`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-type": "Application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        setErrorMessage("");
        props.history.push("/");
      })
      .catch((err) => {
        console.error(err.message);
        setLoading(false);
        setErrorMessage(err.message);
      });
  };
  const handleChange = ({ target: { name, value } }) => {
    let valid = true;
    let error =
      isRequired(value.trim(), name) ||
      minLength1(value.trim()) ||
      ((name === "name" || name === "email") && maxLength50(value.trim())) ||
      (name === "email" && validateEmail(value.trim())) ||
      (name === "message" && maxLength100(value.trim()));

    if (!error) valid = true;
    setFormData({
      ...formData,
      [name]: { value, error, valid },
    });
  };

  return (
    <contactContext.Provider
      value={{ formData, errorMessage, loading, handleSend, handleChange }}
    >
      {props.children}
    </contactContext.Provider>
  );
};

export default withRouter(ContactContextProvider);
