import { createStore, combineReducers, applyMiddleware } from "redux";
import todoReducer from "./reducers/todoReducer";
import singleTaskReducer from "./reducers/singleTaskReducer";
import globalReducer from "./reducers/globalReducer";
import contactReducer from "./reducers/contactReducer";
import taskModalReducer from "./reducers/taskModalReducer";
import navbarReducer from "./reducers/navbarReducer";
import searchReducer from "./reducers/searchReducer";
import thunk from "redux-thunk";
import logger from "redux-logger";

const store = createStore(
  combineReducers({
    todoReducer,
    singleTaskReducer,
    globalReducer,
    contactReducer,
    taskModalReducer,
    navbarReducer,
    searchReducer,
  }),
  applyMiddleware(thunk)
);

window.store = store;
export default store;
