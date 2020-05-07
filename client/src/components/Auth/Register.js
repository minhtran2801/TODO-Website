import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import M from "materialize-css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    M.AutoInit();
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/todo");
    }
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

    this.props.registerUser(newUser, this.props.history);

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
                  className={classnames("", { invalid: errors.name })}
                />
                <label htmlFor="name">Name</label>
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", { invalid: errors.email })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", { invalid: errors.password })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", { invalid: errors.password2 })}
                />
                <label htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
              </div>
              <div className="input-field col s12">
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
                    className={classnames("", { invalid: errors.dob })}
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
                    className={classnames("", { invalid: errors.dob })}
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
                    className={classnames("", { invalid: errors.dob })}
                  />
                  <label htmlFor="year">YYYY</label>
                </div>
                <span className="red-text">{errors.dob}</span>
              </div>
              <div className="input-field col s12">
                <div className="input-field col s3">
                  <label htmlFor="gender">Gender</label>
                </div>
                <div className="input-field col s9">
                  <select
                    id="gender"
                    value={this.state.gender}
                    onChange={this.onChange}
                    className={classnames("", { invalid: errors.gender })}
                  >
                    <option value="" disabled>
                      Choose your gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <span className="red-text">{errors.gender}</span>
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
