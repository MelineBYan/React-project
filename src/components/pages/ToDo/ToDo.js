import React, { Component } from "react";
import { Container, Row, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import Task from "../../Task/Task";
import TaskModal from "../../Modal/TaskModal";
import ConfirmModal from "../../Modal/ConfirmModal";
import InfoModal from "../../Modal/InfoModal";
import Spinner from "../../Spinner/Spinner";
import PropTypes from "prop-types";
import { URL } from "../../../Utils/Constants";
import {
  setOrRemoveLoading,
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
  deleteCheckedTasks,
} from "../../../Redux/actions";
import { set } from "mongoose";

class ToDo extends Component {
  handleDeleteCheckedTasks = () => {
    setOrRemoveLoading(true);
    const { checkedTasks } = this.props;
    fetch(`${URL}/task`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        tasks: Array.from(checkedTasks),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        this.props.deleteCheckedTasks();
      })
      .catch((err) => console.log(err.message))
      .finally(() => setOrRemoveLoading(false));

    this.handleHideModal();
  };

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
        />
      ));
      return jsx;
    };

    return (
      <>
        <Container className="mt-5 bg-light text-light bg-dark shadow-lg p-5">
          <h1 className="text-center my-5">ToDolist Task Manager</h1>
          <Row className="d-flex mt-5">
            <Button
              className="col-4 ml-auto d-inline"
              variant="primary"
              onClick={() => setIsOpenModal(true)}
            >
              Add new task
            </Button>

            <Form.Control
              as="select"
              className="col-2 mr-auto ml-3 bg-secondary text-light"
              custom
              onChange={({ target }) => setFilteredTasks(target.value)}
              disabled={!tasks.length}
            >
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Uncompleted">Uncompleted</option>
            </Form.Control>
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
                  className="ml-5"
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
                setIsOpenModal(false);
                setEditable(null);
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
    tasks: state.todo.tasks,
    loading: state.loading,
    filteredTasks: state.todo.filteredTasks,
    checkedTasks: state.todo.checkedTasks,
    isOpenModal: state.todo.isOpenModal,
    taskInfo: state.todo.taskInfo,
    isOpenConfirmModal: state.todo.isOpenConfirmModal,
    editableTask: state.todo.editableTask,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);
