import React, { Component } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      day: "",
      month: "",
      year: "",
      gender: "",
      errors: {},
    };
  }

  componentDidMount() {
    M.AutoInit();
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      dob: `${this.state.year}-${this.state.month}-${this.state.day}`,
      gender: this.state.gender,
    };

    console.log(newUser);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">arrow_back</i>Back to home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                />
                <label htmlFor="password2">Confirm Password</label>
              </div>
              <div>
                <div className="input-field col s3">
                  <label htmlFor="dob">Date of birth</label>
                </div>
                <div className="input-field col s3">
                  <input
                    onChange={this.onChange}
                    value={this.state.day}
                    error={errors.dob}
                    type="text"
                    id="day"
                  />
                  <label htmlFor="day">DD</label>
                </div>
                <div className="input-field col s3">
                  <input
                    onChange={this.onChange}
                    value={this.state.month}
                    error={errors.dob}
                    type="text"
                    id="month"
                  />
                  <label htmlFor="month">MM</label>
                </div>
                <div className="input-field col s3">
                  <input
                    onChange={this.onChange}
                    value={this.state.year}
                    error={errors.dob}
                    type="text"
                    id="year"
                  />
                  <label htmlFor="year">YYYY</label>
                </div>
              </div>
              <div>
                <div className="input-field col s3">
                  <label htmlFor="gender">Gender</label>
                </div>
                <div className="input-field col s9">
                  <select id="gender"  value={this.state.gender} onChange={this.onChange}>
                    <option value="" disabled>
                      Choose your gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.150px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable black"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
