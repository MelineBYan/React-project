import React, { Component } from "react";
import { Container, Row, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import Task from "../../Task/Task";
import TaskModal from "../../Modal/TaskModal";
import ConfirmModal from "../../Modal/ConfirmModal";
import InfoModal from "../../Modal/InfoModal";
import Spinner from "../../Spinner/Spinner";
import Search from "../../Search/Search";
import PropTypes from "prop-types";
import styles from "./ToDo.module.css";
import {
  setFilteredTasks,
  toggleCheckedTask,
  setIsOpenModal,
  setTaskInfo,
  setIsOpenConfirmModal,
  setEditableTask,
  toggleAllChecked,
  createTask,
  updateTask,
  getTasks,
  removeOneTask,
  removeCheckedTasks,
  toggleTaskStatus,
} from "../../../Redux/actions";

class ToDo extends Component {
  componentDidMount() {
    this.props.setTasks(this.props);
  }

  render() {
    const {
      tasks,
      loading,
      filteredTasks,
      checkedTasks,
      toggleChecked,
      setFilteredTasks,
      taskInfo,
      setTaskInfo,
      setIsOpenModal,
      isOpenConfirmModal,
      setIsOpenConfirmModal,
      editableTask,
      isOpenModal,
      toggleAllChecked,
      setEditable,
      addTask,
      updateTask,
      deleteTask,
      deleteCheckedTasks,
      toggleTaskStatus,
    } = this.props;

    const completedTasks = tasks.filter((task) => checkedTasks.has(task._id));
    const uncompletedTasks = tasks.filter(
      (task) => !checkedTasks.has(task._id)
    );
    const orderedTasks = [...uncompletedTasks, ...completedTasks];
    const taskJSX = (todos) => {
      const jsx = todos.map((todo) => (
        <Task
          key={todo._id}
          task={todo}
          handleDeleteTask={deleteTask}
          handleToggleChecked={toggleChecked}
          isCheckedAnyTask={!!checkedTasks.size}
          completed={checkedTasks.has(todo._id)}
          getEditableTask={(task) => {
            setEditable({ ...task, date: new Date(task.date) });
            setIsOpenModal(true);
          }}
          getTaskInfo={setTaskInfo}
          toggleTaskStatus={toggleTaskStatus}
        />
      ));
      return jsx;
    };

    return (
      <>
        <Container
          className={`mt-5 bg-light text-light bg-dark shadow-lg  ${styles.todoContainer}`}
        >
          <h1 className="text-center mb-5">ToDolist Task Manager</h1>
          <Row className="d-flex">
            <Button
              className="col-3 m-auto d-inline"
              variant="primary"
              onClick={() => setIsOpenModal(true)}
            >
              Add
            </Button>
          </Row>
          <Row className="d-flex mt-4 justify-content-center">
            <Search />
          </Row>
          <Row className="mt-5 d-flex justify-content-center align-content-center mx-auto">
            {tasks.length === 0 ? (
              <h4>Task list is empty</h4>
            ) : filteredTasks === "All" ? (
              taskJSX(orderedTasks)
            ) : filteredTasks === "Completed" ? (
              taskJSX(completedTasks)
            ) : (
              taskJSX(uncompletedTasks)
            )}
          </Row>
          <Row className="justify-content-center mt-5">
            {!!tasks.length && (
              <>
                <Button
                  variant="danger"
                  onClick={() => setIsOpenConfirmModal(true)}
                  disabled={
                    !!!checkedTasks.size || filteredTasks === "Uncompleted"
                  }
                >
                  Delete All Checked
                </Button>
                <Button
                  variant="primary"
                  onClick={toggleAllChecked}
                  className="ml-1"
                  disabled={filteredTasks === "Completed"}
                >
                  {tasks.length !== checkedTasks.size
                    ? "Check All"
                    : "Remove Checked"}
                </Button>
              </>
            )}
          </Row>
          {isOpenModal && (
            <TaskModal
              onHide={() => {
                setEditable(null);
                setIsOpenModal(false);
              }}
              onSubmit={editableTask ? updateTask : addTask}
              editableTask={editableTask}
            />
          )}
          {isOpenConfirmModal && (
            <ConfirmModal
              onHide={() => setIsOpenConfirmModal(false)}
              handleDeleteCheckedTasks={() => deleteCheckedTasks(checkedTasks)}
              countOrTaskName={
                checkedTasks.size !== 1
                  ? checkedTasks.size
                  : tasks.filter(
                      (task) => task._id === checkedTasks.values().next().value
                    )[0].title
              }
            />
          )}

          {taskInfo && (
            <InfoModal onHide={() => setTaskInfo(null)} task={taskInfo} />
          )}
        </Container>
        {loading && <Spinner />}
      </>
    );
  }
}
ToDo.propTypes = {
  history: PropTypes.shape({
    action: PropTypes.string,
    block: PropTypes.func.isRequired,
    createHref: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    goForward: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired,
    listen: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    state: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      path: PropTypes.string,
      url: PropTypes.string,
    }).isRequired,
  }).isRequired,

  editableTask: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  filteredTasks: PropTypes.string.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  isOpenConfirmModal: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  taskInfo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
  addTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  setFilteredTasks: PropTypes.func.isRequired,
  setIsOpenConfirmModal: PropTypes.func.isRequired,
  setIsOpenModal: PropTypes.func.isRequired,
  setTaskInfo: PropTypes.func.isRequired,
  setTasks: PropTypes.func.isRequired,
  toggleAllChecked: PropTypes.func.isRequired,
  toggleChecked: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  setEditable: PropTypes.func.isRequired,
  deleteCheckedTasks: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => {
  return {
    tasks: state.todoReducer.tasks,
    loading: state.globalReducer.loading,
    errorMessage: state.globalReducer.errorMessage,
    filteredTasks: state.todoReducer.filteredTasks,
    checkedTasks: state.todoReducer.checkedTasks,
    isOpenModal: state.todoReducer.isOpenModal,
    taskInfo: state.todoReducer.taskInfo,
    isOpenConfirmModal: state.todoReducer.isOpenConfirmModal,
    editableTask: state.todoReducer.editableTask,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setTasks: (props) => dispatch((dispatch) => getTasks(dispatch, props)),
    deleteTask: (id) => dispatch((dispatch) => removeOneTask(dispatch, id)),
    setFilteredTasks: (value) => dispatch(setFilteredTasks(value)),
    toggleChecked: (id) => dispatch(toggleCheckedTask(id)),
    setIsOpenModal: (isOpen) => dispatch(setIsOpenModal(isOpen)),
    addTask: (task) => dispatch((dispatch) => createTask(dispatch, task)),
    setTaskInfo: (task) => dispatch(setTaskInfo(task)),
    setIsOpenConfirmModal: (isOpen) => dispatch(setIsOpenConfirmModal(isOpen)),
    setEditable: (value) => dispatch(setEditableTask(value)),
    updateTask: (data) => dispatch((dispatch) => updateTask(dispatch, data)),
    deleteCheckedTasks: (checkedTasks) =>
      dispatch((dispatch) => removeCheckedTasks(dispatch, checkedTasks)),
    toggleAllChecked: () => dispatch(toggleAllChecked()),
    toggleTaskStatus: (task) =>
      dispatch((dispatch) => toggleTaskStatus(dispatch, task)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);
