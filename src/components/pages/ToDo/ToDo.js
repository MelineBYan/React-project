import React, { Component } from "react";
import Task from "../../Task/Task";
import TaskModal from "../../Modal/TaskModal";
import ConfirmModal from "../../Modal/ConfirmModal";
import InfoModal from "../../Modal/InfoModal";
import { Container, Row, Button, Form, Col } from "react-bootstrap";
import URL from "../../../Utils/Constant";

class ToDo extends Component {
  state = {
    tasks: [],
    filteredTasks: "All",
    checkedTasks: new Set(),
    isOpenModal: false,
    isOpenConfirmModal: false,
    editableTask: null,
    taskInfo: null,
  };

  getEditableTask = (task) => {
    const editableTask = { ...task, date: new Date(task.date) };
    console.log(task, editableTask);
    this.setState({
      editableTask,
      isOpenModal: true,
    });
  };

  getTaskInfo = (taskInfo) => {
    this.setState({ taskInfo });
  };

  handleSubmit = (task) => {
    fetch(`${URL}/task`, {
      method: "POST",
      body: JSON.stringify(task),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        console.log(data);
        const tasks = [...this.state.tasks, { ...data }];
        this.setState({
          tasks,
        });
      })
      .catch((err) => console.log(err.message));
  };

  handleEditTask = (task) => {
    const { editableTask } = this.state;
    fetch(`${URL}/task/${task._id}`, {
      method: "PUT",
      body: JSON.stringify(task),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) throw data.error;
        console.log(data);
        const tasks = [...this.state.tasks];
        tasks[tasks.findIndex((t) => t._id === editableTask._id)] = data;
        this.setState({
          tasks,
        });
      })
      .catch((err) => console.log(err.message));
  };

  handleDeleteTask = (id) => {
    fetch(`${URL}/task/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) throw data.error;
        let tasks = [...this.state.tasks];
        tasks = tasks.filter((t) => t._id !== id);
        this.setState({
          tasks,
        });
      })
      .catch((err) => console.log(err.message));
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
    const { checkedTasks } = this.state;
    fetch(`${URL}/task`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        tasks: Array.from(checkedTasks),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) throw data.error;
        let tasks = [...this.state.tasks];
        tasks = tasks.filter((task) => !checkedTasks.has(task._id));
        this.setState({
          tasks,
          checkedTasks: new Set(),
        });
      })
      .catch((err) => console.log(err.message));

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
      editableTask: null,
      isOpenConfirmModal: false,
      taskInfo: null,
    });
  };

  componentDidMount() {
    fetch("http://localhost:3001/task")
      .then((res) => res.json())
      .then((tasks) => this.setState({ tasks }))
      .catch((err) => console.error(err.message));
  }

  render() {
    const {
      tasks,
      checkedTasks,
      isOpenModal,
      isOpenConfirmModal,
      editableTask,
      filteredTasks,
      taskInfo,
    } = this.state;

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
          handleDeleteTask={this.handleDeleteTask}
          handleToggleChecked={this.handleToggleChecked}
          isCheckedAnyTask={!!checkedTasks.size}
          completed={checkedTasks.has(todo._id)}
          getEditableTask={this.getEditableTask}
          getTaskInfo={this.getTaskInfo}
        />
      ));
      return jsx;
    };

    return (
      <Container className="mt-5 bg-light text-light bg-dark shadow-lg p-5">
        <h1 className="text-center my-5">ToDolist Task Manager</h1>
        <Row className="d-flex mt-5">
          <Button
            className="col-4 ml-auto d-inline"
            variant="primary"
            onClick={() => {
              this.setState({
                isOpenModal: true,
              });
            }}
          >
            ADD NEW TASK
          </Button>

          <Form.Control
            as="select"
            className="col-2 mr-auto ml-3 bg-secondary text-light"
            custom
            onChange={(e) => this.setState({ filteredTasks: e.target.value })}
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
                onClick={() => this.setState({ isOpenConfirmModal: true })}
                disabled={
                  !!!checkedTasks.size || filteredTasks === "Uncompleted"
                }
              >
                Delete All Checked
              </Button>
              <Button
                variant="primary"
                onClick={this.handleToggleAllChecked}
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
            onHide={this.handleHideModal}
            onSubmit={editableTask ? this.handleEditTask : this.handleSubmit}
            editableTask={editableTask}
          />
        )}
        {isOpenConfirmModal && (
          <ConfirmModal
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

        {taskInfo && (
          <InfoModal onHide={this.handleHideModal} task={taskInfo} />
        )}
      </Container>
    );
  }
}

export default ToDo;
