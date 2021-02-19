import React, { Component } from "react";

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

  handleSubmit = () => {
    const { cb } = this.props;
    cb(this.state.inputValue);
  };

  render() {
    return (
      <div>
        <input type="text" onChange={this.handleChange} />
        <button onClick={this.handleSubmit}>ADD TASK</button>
      </div>
    );
  }
}

export default AddTask;
