import React, { useState } from "react";
import { singleTaskContext } from "../Context";
import { URL } from "../../Utils/Constants";

const SingleTaskContextProvider = (props) => {
  const [singleTask, setSingleTask] = useState(null);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleToggleEditTask = () => {
    setEdit(!edit);
  };

  const handleEditTask = (singleTask) => {
    setLoading(true);
    setErrorMessage(null);
    fetch(`${URL}/task/${singleTask._id}`, {
      method: "PUT",
      body: JSON.stringify(singleTask),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        setSingleTask(data);
        setEdit(false);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRemoveTask = () => {
    setLoading(true);
    setErrorMessage(null);
    const { id } = props.match.params;
    fetch(`${URL}/task/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        props.history.push("/");
      })
      .catch((err) => {
        setLoading(false);
        setErrorMessage(err.message);
      });
  };
  return (
    <singleTaskContext.Provider
      value={{
        singleTask,
        edit,
        loading,
        errorMessage,
        setSingleTask,
        handleEditTask,
        handleRemoveTask,
        handleToggleEditTask,
      }}
    >
      {props.children}
    </singleTaskContext.Provider>
  );
};

export default SingleTaskContextProvider;
