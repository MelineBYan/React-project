import React, { Component } from "react";
import AddTask from "../AddTask/AddTask";
import { v4 as uuidv4 } from "uuid";

class ToDo extends Component {
  state = {
    tasks: [],
    inputValue: "",
  };

  handleSubmit = (val) => {
    const tasks = [...this.state.tasks];
    tasks.push(val);
    console.log(tasks);
    this.setState({
      tasks,
    });
  };

  render() {
    return (
      <div>
        <div>
          <AddTask cb={this.handleSubmit} />
        </div>
        <div>
          {this.state.tasks.map((task) => (
            <div key={uuidv4()}>{task}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default ToDo;
