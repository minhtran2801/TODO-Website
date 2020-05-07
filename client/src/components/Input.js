import React, { Component } from "react";
import axios from "axios";

class Input extends Component {
  state = {
    action: "",
  };

  addTodo = () => {
    const task = { action: this.state.action };

    if (task.action && task.action.length > 0) {
      axios
        .post("/api/todos", task)
        .then((res) => {
          if (res.data) {
            this.props.getTodos();
            this.setState({ action: "" });
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Input field required");
    }
  };

  handleChange = (e) => {
    this.setState({
      action: e.target.value,
    });
  };

  render() {
    let { action } = this.state;
    return (
      <div className="container">
        <div style={{ marginTop: "1rem" }} className="row">
          <div className="col s8 offset-s2">
            <div className="input-field col s12">
              <input
                type="text"
                onChange={this.handleChange}
                value={action}
                id="todo"
              />
              <label htmlFor="todo">Add a TODO task</label>
            </div>
            <div className="col s12" style={{ paddingLeft: "11.150px" }}>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                onClick={this.addTodo}
                className="btn btn-large waves-effect waves-light hoverable black"
              >
                Add todo
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Input;
