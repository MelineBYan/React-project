import React, { Component } from "react";
import styles from "./AddTask.module.css";
class AddTask extends Component {
  state = {
    inputValue: "",
  };

  handleChange = ({ target }) => {
    console.log(this.state);
    this.setState({
      inputValue: target.value,
    });
  };

  handleSubmit = (e) => {
    const { cb } = this.props;
    if (this.state.inputValue) {
      cb(this.state.inputValue);
      this.setState({
        inputValue: "",
      });
    }
  };

  render() {
    return (
      <div className={styles.addTask}>
        <input
          className={styles.addTaskInput}
          type="text"
          placeholder="Add new task"
          value={this.state.inputValue}
          onChange={this.handleChange}
        />
        <button className={styles.addTaskButton} onClick={this.handleSubmit}>
          +
        </button>
      </div>
    );
  }
}

export default AddTask;
