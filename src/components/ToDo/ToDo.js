import React, { Component } from "react";
import AddTask from "../AddTask/AddTask";
import Task from "../Task/Task";
import { v4 as uuidv4 } from "uuid";
import { Container, Row, Col, Button } from "react-bootstrap";

class ToDo extends Component {
  state = {
    tasks: [],
    checkedTasks: new Set(),
  };

  handleSubmit = (val) => {
    const tasks = [...this.state.tasks, { _id: uuidv4(), title: val }];
    this.setState({
      tasks,
    });
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
  };
  render() {
    return (
      <Container>
        <Row className="mt-3 d-flex justify-content-center">
          <Col className="col-7 px-3 py-1 mx-2 my-3">
            <h1 className="text-center">My ToDolist</h1>
            <AddTask
              cb={this.handleSubmit}
              isCheckedAnyTask={this.state.checkedTasks.size}
            />
          </Col>
        </Row>
        <Row className="mt-5 d-flex justify-content-center align-items-end">
          {this.state.tasks.length ? (
            this.state.tasks.map((task) => (
              <Task
                key={task._id}
                task={task}
                handleDeleteTask={this.handleDeleteTask}
                handleToggleChecked={this.handleToggleChecked}
                isCheckedAnyTask={this.state.checkedTasks.size}
                isChecked={this.state.checkedTasks.has(task._id)}
              />
            ))
          ) : (
            <h4>Please, add new Tasks</h4>
          )}
        </Row>
        <Row className="justify-content-center mt-5">
          <Button
            variant="danger"
            onClick={this.handleDeleteCheckedTasks}
            disabled={!!!this.state.checkedTasks.size}
          >
            Delete All Checked
          </Button>
        </Row>
      </Container>
    );
  }
}

export default ToDo;
