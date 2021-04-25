import {
  URL,
  SET_TASKS,
  DELETE_TASK,
  SET_LOADING,
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
  SET_FORMDATA,
  RESET_DATA,
  RESET_CONTACT_DATA,
  RESET_GLOBAL_DATA,
  CHANGE_MODAL_FORM,
  SET_DATE,
  RESET_MODAL_DATA,
  SET_INITIALSTATE,
  SET_SUCCESS,
  SET_CLICK,
  CHANGE_NAVBAR_DIRECTION,
  RESET_NAVBAR_DATA,
  CHANGE_SEARCH_VALUE,
  SET_DROPDOWN_VALUE,
  SET_DATEPICKER_DATE,
  SORT_FILTER_TASKS,
  TOGGLE_CLICK,
  RESET_SEARCH_DATA,
} from "../Utils/Constants";
import formatDate from "../Utils/helpers/dateFormatter";

//Actions
// Global
export const setOrRemoveLoading = (isLoading) => {
  return {
    type: SET_LOADING,
    payload: isLoading,
  };
};
export const resetGlobalData = () => {
  return {
    type: RESET_GLOBAL_DATA,
  };
};

export const setError = (message) => {
  return {
    type: SET_ERROR,
    payload: message,
  };
};
export const setSuccess = (message) => {
  return {
    type: SET_SUCCESS,
    payload: message,
  };
};

// ToDo && SingleTask
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
export const setEditableTask = (value) => {
  return {
    type: SET_EDITABLETASK,
    payload: value,
  };
};

export const resetData = () => {
  return {
    type: RESET_DATA,
  };
};
export const setIsOpenConfirmModal = (isOpen) => {
  return {
    type: SET_ISOPENCONFIRMMODAL,
    payload: isOpen,
  };
};

export const setTask = (task) => {
  return {
    type: SET_SINGLETASK,
    payload: task,
  };
};

export const editTask = (value) => {
  return {
    type: EDIT_TASK,
    payload: value,
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

// Contact
export const setFormData = (data) => {
  return {
    type: SET_FORMDATA,
    payload: data,
  };
};

export const resetContactData = () => {
  return {
    type: RESET_CONTACT_DATA,
  };
};

// TaskModal
export const resetModalData = () => {
  return {
    type: RESET_MODAL_DATA,
  };
};

export const changeModalForm = (data) => {
  return {
    type: CHANGE_MODAL_FORM,
    payload: data,
  };
};

export const setDate = (date) => {
  return {
    type: SET_DATE,
    payload: date,
  };
};
export const setModalInitialState = (data) => {
  return {
    type: SET_INITIALSTATE,
    payload: data,
  };
};

//Navbar
export const setClick = () => {
  return {
    type: SET_CLICK,
  };
};
export const handleResize = (size) => {
  return {
    type: CHANGE_NAVBAR_DIRECTION,
    payload: size,
  };
};
export const resetNavbarData = () => {
  return {
    type: RESET_NAVBAR_DATA,
  };
};

//Search
export const changeSearchValue = (target) => {
  return {
    type: CHANGE_SEARCH_VALUE,
    payload: target,
  };
};

export const setDropdownValue = (...data) => {
  return {
    type: SET_DROPDOWN_VALUE,
    payload: data,
  };
};
export const setDatepickerDate = (...data) => {
  return {
    type: SET_DATEPICKER_DATE,
    payload: data,
  };
};
export const toggleClick = (value) => {
  return {
    type: TOGGLE_CLICK,
    payload: value,
  };
};
export const resetSearchData = () => {
  return {
    type: RESET_SEARCH_DATA,
  };
};

// Thunks
// ToDo && SingleTask
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
    dispatch(setSuccess(null));
    const response = await fetch(`${URL}/task`, {
      method: "POST",
      body: JSON.stringify(task),
      headers: { "Content-type": "application/json" },
    });
    const data = await response.json();

    if (data.error) throw data.error;
    dispatch(addTask(data));
    dispatch(setSuccess("Task was added successfully!"));
  } catch (err) {
    console.log("err", err.message);
  } finally {
    dispatch(setOrRemoveLoading(false));
  }
};

export const updateTask = async (dispatch, task, path = null) => {
  try {
    dispatch(setError(null));
    dispatch(setSuccess(null));
    dispatch(setOrRemoveLoading(true));
    const response = await fetch(`${URL}/task/${task._id}`, {
      method: "PUT",
      body: JSON.stringify(task),
      headers: { "Content-type": "application/json" },
    });
    const data = await response.json();
    if (data.error) throw data.error;
    if (!path) {
      dispatch(editTask(data));
    } else {
      dispatch(setTask(data));
      dispatch(toggleEdit());
      dispatch(setError(null));
    }
    dispatch(setSuccess("Task was updated successfully!"));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setOrRemoveLoading(false));
  }
};

export const removeOneTask = async (dispatch, id, history = null) => {
  try {
    setError(null);
    dispatch(setOrRemoveLoading(true));
    dispatch(setSuccess(null));
    const res = await fetch(`${URL}/task/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.error) throw data.error;
    if (!history) {
      dispatch(deleteTask(id));
    } else {
      dispatch(setSuccess("Task was removed successfully!"));
      history.push("/");
    }
    dispatch(setSuccess("Task was removed successfully!"));
  } catch (err) {
    setError(err.message);
  } finally {
    dispatch(setOrRemoveLoading(false));
  }
};

export const toggleTaskStatus = async (dispatch, task) => {
  try {
    dispatch(setOrRemoveLoading(true));
    dispatch(setSuccess(null));
    const status = task.status === "done" ? "active" : "done";
    const response = await fetch(`${URL}/task/${task._id}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
      headers: { "Content-type": "application/json" },
    });
    const data = await response.json();
    if (data.error) throw data.error;
    dispatch(editTask(data));
    dispatch(setSuccess("Task was updated successfully!"));
  } catch (err) {
    setError(err.message);
  } finally {
    dispatch(setOrRemoveLoading(false));
  }
};

export const removeCheckedTasks = async (dispatch, checkedTasks) => {
  try {
    dispatch(setOrRemoveLoading(true));
    dispatch(setSuccess(null));
    const res = await fetch(`${URL}/task`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        tasks: Array.from(checkedTasks),
      }),
    });
    const data = await res.json();

    if (data.error) throw data.error;
    dispatch(deleteCheckedTasks());
    dispatch(setSuccess("Tasks were removed successfully!"));
  } catch (err) {
    console.error(err.message);
  } finally {
    dispatch(setIsOpenConfirmModal(false));
    dispatch(setOrRemoveLoading(false));
  }
};

// SingleTask
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

// Contact
export const setChangesForm = (data) => (dispatch) => {
  dispatch(setFormData(data));
};

export const sendContactData = (formData, history) => async (dispatch) => {
  try {
    dispatch(setError(null));
    dispatch(setSuccess(null));
    dispatch(setOrRemoveLoading(true));
    const body = {
      name: formData.name.value,
      email: formData.email.value,
      message: formData.message.value,
    };
    const res = await fetch(`${URL}/form`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-type": "Application/json" },
    });
    const data = await res.json();
    if (data.error) throw data.error;
    dispatch(setError(null));
    dispatch(setSuccess("Form was sent successfully!"));
    history.push("/");
  } catch (err) {
    console.error(err.message);
    dispatch(setOrRemoveLoading(false));
    dispatch(setError(err.message));
  }
};
export const resetContactState = () => (dispatch) => {
  dispatch(resetData());
};

// TaskModal
export const submitTaskModalForm = async (e, state, onSubmit) => {
  try {
    const { title, description, date } = state;
    if (
      !title.trim() ||
      !description.trim() ||
      (e.type === "keypress" && e.key !== "Enter")
    )
      return;
    onSubmit({ ...state, date: formatDate(date) });
  } catch (err) {
    console.error(err.message);
  }
};

//Search
export const sortOrFilrterTasks = async (dispatch, state) => {
  try {
    let body = { ...state };
    delete body.click;

    let query = Object.entries(body)
      .reduce(
        (q, elem) => q + (elem[1] ? elem[0] + "=" + elem[1] + "&" : ""),
        "?"
      )
      .slice(0, -1);
    if (query.length > 1) {
      dispatch(setError(null));
      dispatch(setSuccess(null));
      dispatch(setOrRemoveLoading(true));
      const res = await fetch(`${URL}/task${query}`);
      const data = await res.json();
      if (data.error) throw data.error;
      dispatch(setError(null));
      dispatch(setOrRemoveLoading(false));
      dispatch(setSuccess("Tasks were sorted successfully!"));
      dispatch(setTasks(data));
      dispatch(resetSearchData());
      dispatch(toggleClick(false));
    }
  } catch (err) {
    dispatch(setOrRemoveLoading(false));
    dispatch(setError(err.message));
  }
};
