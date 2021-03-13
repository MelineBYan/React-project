import React, { Component } from "react";

import Task from "../Task/Task";
import Modal from "../Modal/Modal";
import Confirm from "../Confirm/Confirm";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { Container, Row, Button } from "react-bootstrap";

class ToDo extends Component {
  state = {
    tasks: [],
    checkedTasks: new Set(),
    isOpenModal: false,
    isOpenConfirmModal: false,
    isOpenAddTaskModal: false,
    isOpenEditTaskModal: false,
    editableTask: null,
  };

  getEditableTask = (editableTask) => {
    this.setState({
      editableTask,
      isOpenModal: true,
      isOpenEditTaskModal: true,
    });
  };

  handleSubmit = (val) => {
    const { isOpenAddTaskModal, isOpenEditTaskModal } = this.state;
    if (isOpenAddTaskModal) {
      const tasks = [...this.state.tasks, { ...val }];

      this.setState({
        tasks,
      });
    } else if (isOpenEditTaskModal) {
      const tasks = [...this.state.tasks];
      tasks[
        tasks.findIndex((t) => t._id === this.state.editableTask._id)
      ] = val;
      this.setState({
        tasks,
      });
    }
  };
  handleDeleteTask = (id) => {
    let newTasks = [...this.state.tasks];
    newTasks = newTasks.filter((t) => t._id !== id);
    this.setState({
      tasks: newTasks,
    });
  };

  handleToggleChecked = (id) => {
    let checkedTasks = new Set(this.state.checkedTasks);
    if (!checkedTasks.has(id)) {
      checkedTasks.add(id);
    } else {
      checkedTasks.delete(id);
    }
    this.setState({
      checkedTasks,
    });
  };

  handleDeleteCheckedTasks = () => {
    let tasks = [...this.state.tasks];
    tasks = tasks.filter((task) => !this.state.checkedTasks.has(task._id));
    this.setState({
      tasks,
      checkedTasks: new Set(),
    });
    this.handleHideModal();
  };

  handleToggleAllChecked = () => {
    if (this.state.checkedTasks.size !== this.state.tasks.length) {
      const checkedTasks = new Set();
      this.state.tasks.forEach((task) => checkedTasks.add(task._id));

      this.setState({
        checkedTasks,
      });
    } else {
      this.setState({
        checkedTasks: new Set(),
      });
    }
  };

  handleHideModal = () => {
    this.setState({
      isOpenModal: false,
      isOpenEditTaskModal: false,
      isOpenAddTaskModal: false,
      isOpenConfirmModal: false,
    });
  };
  render() {
    const {
      tasks,
      checkedTasks,
      isOpenModal,
      isOpenEditTaskModal,
      isOpenAddTaskModal,
      isOpenConfirmModal,
      editableTask,
    } = this.state;
    return (
      <>
        <Container>
          <Row className="mt-3 mx-5 d-flex flex-column justify-content-center">
            <h1 className="text-center my-5">My ToDolist</h1>

            <Button
              variant="primary"
              onClick={() => {
                this.setState({
                  isOpenModal: true,
                  isOpenAddTaskModal: true,
                });
              }}
              className="btnAdd"
            >
              ADD NEW TASK
            </Button>
          </Row>
          <Row className="mt-5 d-flex justify-content-center align-items-end">
            {tasks.length ? (
              tasks.map((task) => (
                <Task
                  key={task._id}
                  task={task}
                  handleDeleteTask={this.handleDeleteTask}
                  handleToggleChecked={this.handleToggleChecked}
                  isCheckedAnyTask={checkedTasks.size}
                  isChecked={checkedTasks.has(task._id)}
                  getEditableTask={this.getEditableTask}
                />
              ))
            ) : (
              <h4>Please, add new Tasks</h4>
            )}
          </Row>
          <Row className="justify-content-center mt-5">
            <Button
              variant="danger"
              onClick={() => this.setState({ isOpenConfirmModal: true })}
              disabled={!!!checkedTasks.size}
            >
              Delete All Checked
            </Button>
            <Button
              variant="primary"
              onClick={this.handleToggleAllChecked}
              className="ml-5"
              disabled={!tasks.length}
            >
              {(!checkedTasks.size && !tasks.length) ||
              (tasks && tasks.length !== checkedTasks.size)
                ? "Check All"
                : "Remove Checked"}
            </Button>
          </Row>
        </Container>
        {isOpenModal && (
          <Modal
            onHide={this.handleHideModal}
            onSubmit={this.handleSubmit}
            isOpenEditTaskModal={isOpenEditTaskModal}
            isOpenAddTaskModal={isOpenAddTaskModal}
            editableTask={editableTask}
          />
        )}
        {isOpenConfirmModal && (
          <Confirm
            onHide={this.handleHideModal}
            handleDeleteCheckedTasks={this.handleDeleteCheckedTasks}
            countOrTaskName={
              checkedTasks.size !== 1
                ? checkedTasks.size
                : tasks.filter(
                    (task) => task._id === checkedTasks.values().next().value
                  )[0].title
            }
          />
        )}
      </>
    );
  }
}

ToDo.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),

  checkedTasks: PropTypes.instanceOf(Set),
};

export default ToDo;
