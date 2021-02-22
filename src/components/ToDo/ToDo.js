import React, { Component } from "react";
import AddTask from "../AddTask/AddTask";
import styles from "./ToDo.module.css";
import { v4 as uuidv4 } from "uuid";

console.log(styles);

class ToDo extends Component {
  state = {
    tasks: [],
  };

  handleSubmit = (val) => {
    const tasks = [...this.state.tasks];
    tasks.push(val);

    this.setState({
      tasks,
    });
  };

  render() {
    return (
      <div className={styles.body}>
        <h1>My Todolist</h1>
        <div>
          <AddTask cb={this.handleSubmit} />
        </div>
        <div className={styles.tasksContainer}>
          {this.state.tasks.map((task) => (
            <div key={uuidv4()}>
              <input className={styles.taskCheckbox} type="checkbox" />
              <div className={styles.task}> {task}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ToDo;
