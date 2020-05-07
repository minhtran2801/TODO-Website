import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import LogOutLink from "./LogOutLink";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper black">
            <Link
              to="/"
              style={{ fontFamily: "monospace" }}
              className="col s5 brand-logo center white-text"
            >
              <i className="material-icons">storage</i>
              MY TODO LIST
            </Link>
            {this.props.auth.isAuthenticated && <LogOutLink />}
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));
