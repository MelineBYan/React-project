import {
  URL,
  SET_TASKS,
  DELETE_TASK,
  TOGGLE_LOADING,
  SET_FILTEREDTASKS,
  TOGGLE_CHECKED,
  SET_ISOPENMODAL,
  ADD_TASK,
  SET_TASKINFO,
  SET_ISOPENCONFIRMMODAL,
  SET_EDITABLETASK,
  EDIT_TASK,
  DELETE_CHECKED_TASKS,
  TOGGLE_ALL_CHECKED,
  SET_SINGLETASK,
  SET_ERROR,
  TOGGLE_EDIT,
} from "../Utils/Constants";

export const setTasks = (tasks) => {
  return {
    type: SET_TASKS,
    payload: tasks,
  };
};
export const deleteTask = (id) => {
  return {
    type: DELETE_TASK,
    payload: id,
  };
};

export const setOrRemoveLoading = (isLoading) => {
  return {
    type: TOGGLE_LOADING,
    payload: isLoading,
  };
};
export const setFilteredTasks = (value) => {
  return {
    type: SET_FILTEREDTASKS,
    payload: value,
  };
};

export const toggleCheckedTask = (id) => {
  return {
    type: TOGGLE_CHECKED,
    payload: id,
  };
};

export const setIsOpenModal = (isOpen) => {
  return {
    type: SET_ISOPENMODAL,
    payload: isOpen,
  };
};

export const addTask = (task) => {
  return {
    type: ADD_TASK,
    payload: task,
  };
};
export const setTaskInfo = (task) => {
  return {
    type: SET_TASKINFO,
    payload: task,
  };
};
export const setTask = (task) => {
  return {
    type: SET_SINGLETASK,
    payload: task,
  };
};

export const setIsOpenConfirmModal = (isOpen) => {
  return {
    type: SET_ISOPENCONFIRMMODAL,
    payload: isOpen,
  };
};

export const setEditableTask = (value) => {
  return {
    type: SET_EDITABLETASK,
    payload: value,
  };
};

export const editTask = (value) => {
  return {
    type: EDIT_TASK,
    payload: value,
  };
};
export const setError = (message) => {
  return {
    type: SET_ERROR,
    payload: message,
  };
};

export const deleteCheckedTasks = () => {
  return {
    type: DELETE_CHECKED_TASKS,
  };
};

export const toggleAllChecked = () => {
  return {
    type: TOGGLE_ALL_CHECKED,
  };
};
export const toggleEdit = () => {
  return {
    type: TOGGLE_EDIT,
  };
};

export const setSingleTask = async (dispatch, props) => {
  try {
    const { id } = props.match.params;
    const response = await fetch(`${URL}/task/${id}`);
    const task = await response.json();
    if (task.error) throw task.error;
    dispatch(setTask(task));
  } catch (err) {
    console.error("error", err.message);
    props.history.push(`/error/500${err.status}`);
  }
};

export const editSingleTask = async (dispatch, task) => {
  try {
    dispatch(setError(null));
    dispatch(setOrRemoveLoading(true));
    const response = await fetch(`${URL}/task/${task._id}`, {
      method: "PUT",
      body: JSON.stringify(task),
      headers: { "Content-type": "application/json" },
    });
    const data = await response.json();
    if (data.error) throw data.error;
    dispatch(setTask(data));
    dispatch(toggleEdit());
    dispatch(setOrRemoveLoading(false));
    dispatch(setError(null));
  } catch (error) {
    dispatch(setOrRemoveLoading(false));
    dispatch(setError(error.message));
  }
};

export const removeTask = async (dispatch, props) => {
  try {
    dispatch(setError(null));
    dispatch(setOrRemoveLoading(true));

    const { id } = props.match.params;
    const response = await fetch(`${URL}/task/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (data.error) throw data.error;
    dispatch(setOrRemoveLoading(false));
    props.history.push("/");
  } catch (error) {
    dispatch(setOrRemoveLoading(false));
    dispatch(setError(error.message));
  }
};

export const getTasks = async (dispatch, props) => {
  try {
    dispatch(setOrRemoveLoading(true));
    const res = await fetch("http://localhost:3001/task");
    const tasks = await res.json();
    if (tasks.error) throw tasks.error;
    dispatch(setTasks(tasks));
  } catch (err) {
    console.error(err.message);
    props.history.push("/error/404");
  } finally {
    dispatch(setOrRemoveLoading(false));
  }
};

export const createTask = async (dispatch, task) => {
  try {
    dispatch(setOrRemoveLoading(true));
    const response = await fetch(`${URL}/task`, {
      method: "POST",
      body: JSON.stringify(task),
      headers: { "Content-type": "application/json" },
    });
    const data = await response.json();

    if (data.error) throw data.error;
    dispatch(addTask(data));
  } catch (err) {
    console.log("err", err.message);
  } finally {
    dispatch(setOrRemoveLoading(false));
  }
};

export const updateTask = async (dispatch, task) => {
  try {
    dispatch(setOrRemoveLoading(true));
    const response = await fetch(`${URL}/task/${task._id}`, {
      method: "PUT",
      body: JSON.stringify(task),
      headers: { "Content-type": "application/json" },
    });
    const data = await response.json();
    if (data.error) throw data.error;
    dispatch(editTask(data));
  } catch (err) {
    console.error(err.message);
  } finally {
    dispatch(setOrRemoveLoading(false));
  }
};

export const removeOneTask = async (dispatch, id) => {
  try {
    dispatch(setOrRemoveLoading(true));
    const res = await fetch(`${URL}/task/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.error) throw data.error;
    dispatch(deleteTask(id));
  } catch (err) {
    console.log(err.message);
  } finally {
    dispatch(setOrRemoveLoading(false));
  }
};

export const removeCheckedTasks = async (dispatch, checkedTasks) => {
  try {
    dispatch(setOrRemoveLoading(true));
    const res = await fetch(`${URL}/task`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        tasks: Array.from(checkedTasks),
      }),
    });
    const data = res.json();

    if (data.error) throw data.error;
    dispatch(deleteCheckedTasks());
  } catch (err) {
    console.log(err.message);
  } finally {
    dispatch(setOrRemoveLoading(false));
    dispatch(setIsOpenConfirmModal(false));
  }
};
