import React, { Component } from "react";
import AddTask from "../AddTask/AddTask";
import Task from "../Task/Task";
import styles from "./ToDo.module.css";
import { v4 as uuidv4 } from "uuid";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash, faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

class ToDo extends Component {
  state = {
    tasks: [],
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

  render() {
    return (
      <Container>
        <Row className="mt-3 d-flex justify-content-center">
          <Col className="col-7 px-3 py-1 mx-2 my-3">
            <h1 className="text-center">My ToDolist</h1>
            <AddTask cb={this.handleSubmit} />
          </Col>
        </Row>
        <Row className="mt-5 d-flex justify-content-center align-items-end">
          {this.state.tasks.map((task) => (
            <Task
              key={task._id}
              task={task}
              handleDeleteTask={this.handleDeleteTask}
            />
          ))}
        </Row>
      </Container>
    );
  }
}

export default ToDo;
