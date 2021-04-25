import {
  SET_TASKS,
  DELETE_TASK,
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
  RESET_DATA,
} from "../../Utils/Constants";

const initialState = {
  tasks: [],
  filteredTasks: "All",
  checkedTasks: new Set(),
  isOpenModal: false,
  taskInfo: null,
  isOpenConfirmModal: false,
  editableTask: null,
};

const todoReduser = (state = initialState, action) => {
  switch (action.type) {
    case SET_TASKS: {
      return {
        ...state,
        tasks: action.payload,
      };
    }
    case DELETE_TASK: {
      let tasks = [...state.tasks];
      tasks = tasks.filter((t) => t._id !== action.payload);
      return {
        ...state,
        tasks,
      };
    }

    case SET_FILTEREDTASKS: {
      return {
        ...state,
        filteredTasks: action.payload,
      };
    }

    case TOGGLE_CHECKED: {
      let checkedTasks = new Set(state.checkedTasks);
      if (!checkedTasks.has(action.payload)) {
        checkedTasks.add(action.payload);
      } else {
        checkedTasks.delete(action.payload);
      }
      return {
        ...state,
        checkedTasks,
      };
    }
    case SET_ISOPENMODAL: {
      return {
        ...state,
        isOpenModal: action.payload,
      };
    }
    case ADD_TASK: {
      const tasks = [...state.tasks, { ...action.payload }];
      return {
        ...state,
        tasks,
        isOpenModal: false,
      };
    }
    case SET_TASKINFO: {
      return {
        ...state,
        taskInfo: action.payload,
      };
    }
    case SET_ISOPENCONFIRMMODAL: {
      return {
        ...state,
        isOpenConfirmModal: action.payload,
      };
    }
    case SET_EDITABLETASK: {
      return {
        ...state,
        editableTask: action.payload,
      };
    }
    case EDIT_TASK: {
      const tasks = [...state.tasks];
      tasks[tasks.findIndex((t) => t._id === action.payload._id)] =
        action.payload;
      return {
        ...state,
        tasks,
        isOpenModal: false,
        editableTask: null,
      };
    }
    case DELETE_CHECKED_TASKS: {
      let tasks = [...state.tasks];
      tasks = tasks.filter((task) => !state.checkedTasks.has(task._id));
      return {
        ...state,
        tasks,
        checkedTasks: new Set(),
      };
    }
    case TOGGLE_ALL_CHECKED: {
      if (state.checkedTasks.size !== state.tasks.length) {
        const checkedTasks = new Set();
        state.tasks.forEach((task) => checkedTasks.add(task._id));
        return {
          ...state,
          checkedTasks,
        };
      }
      return {
        ...state,
        checkedTasks: new Set(),
      };
    }

    case RESET_DATA: {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default todoReduser;
