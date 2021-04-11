import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
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
const initialState = {
  todo: {
    tasks: [],
    filteredTasks: "All",
    checkedTasks: new Set(),
    isOpenModal: false,
    taskInfo: null,
    isOpenConfirmModal: false,
    editableTask: null,
  },
  singleTask: {
    sigleTask: null,
    edit: false,
    errorMessage: null,
  },
  loading: false,
};

const todoReduser = (state = initialState, action) => {
  switch (action.type) {
    case SET_TASKS: {
      return {
        ...state,
        todo: { ...state.todo, tasks: action.payload },
      };
    }
    case DELETE_TASK: {
      let tasks = [...state.todo.tasks];
      tasks = tasks.filter((t) => t._id !== action.payload);
      return {
        ...state,
        todo: { ...state.todo, tasks },
      };
    }
    case TOGGLE_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case SET_FILTEREDTASKS: {
      return {
        ...state,
        todo: {
          ...state.todo,
          filteredTasks: action.payload,
        },
      };
    }

    case TOGGLE_CHECKED: {
      let checkedTasks = new Set(state.todo.checkedTasks);
      if (!checkedTasks.has(action.payload)) {
        checkedTasks.add(action.payload);
      } else {
        checkedTasks.delete(action.payload);
      }
      return {
        ...state,
        todo: {
          ...state.todo,
          checkedTasks,
        },
      };
    }
    case SET_ISOPENMODAL: {
      return {
        ...state,
        todo: {
          ...state.todo,
          isOpenModal: action.payload,
        },
      };
    }
    case ADD_TASK: {
      const tasks = [...state.todo.tasks, { ...action.payload }];
      return {
        ...state,
        todo: {
          ...state.todo,
          tasks,
          isOpenModal: false,
        },
      };
    }
    case SET_TASKINFO: {
      return {
        ...state,
        todo: {
          ...state.todo,
          taskInfo: action.payload,
        },
      };
    }
    case SET_ISOPENCONFIRMMODAL: {
      return {
        ...state,
        todo: {
          ...state.todo,
          isOpenConfirmModal: action.payload,
        },
      };
    }
    case SET_EDITABLETASK: {
      return {
        ...state,
        todo: {
          ...state.todo,
          editableTask: action.payload,
          // isOpenModal: true,
        },
      };
    }
    case EDIT_TASK: {
      const tasks = [...state.todo.tasks];
      tasks[tasks.findIndex((t) => t._id === state.todo.editableTask._id)] =
        action.payload;
      return {
        ...state,
        todo: {
          ...state.todo,
          tasks,
          isOpenModal: false,
          editableTask: null,
        },
      };
    }
    case DELETE_CHECKED_TASKS: {
      let tasks = [...state.todo.tasks];
      tasks = tasks.filter((task) => !state.todo.checkedTasks.has(task._id));
      return {
        ...state,
        todo: {
          ...state.todo,
          tasks,
          checkedTasks: new Set(),
        },
      };
    }
    case TOGGLE_ALL_CHECKED: {
      if (state.todo.checkedTasks.size !== state.todo.tasks.length) {
        const checkedTasks = new Set();
        state.todo.tasks.forEach((task) => checkedTasks.add(task._id));

        return {
          ...state,
          todo: {
            ...state.todo,
            checkedTasks,
          },
        };
      }
      return {
        ...state,
        todo: {
          ...state.todo,
          checkedTasks: new Set(),
        },
      };
    }
    case SET_SINGLETASK: {
      return {
        ...state,
        singleTask: {
          ...state.singleTask,
          singleTask: action.payload,
        },
      };
    }
    case SET_ERROR: {
      return {
        ...state,
        singleTask: {
          ...state.singleTask,
          errorMessage: action.payload,
        },
      };
    }

    case TOGGLE_EDIT: {
      return {
        ...state,
        singleTask: {
          ...state.singleTask,
          edit: !state.singleTask.edit,
        },
      };
    }

    default:
      return state;
  }
};

const store = createStore(todoReduser, applyMiddleware(thunk));
window.store = store;
export default store;
