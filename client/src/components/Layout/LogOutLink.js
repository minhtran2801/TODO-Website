import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class LogOutLink extends Component {

    onLogoutClick = (e) => {
        e.preventDefault();
        this.props.logoutUser();
      };

      render() {
          return (
            <ul className="right">
            <li onClick={this.onLogoutClick}>
              <Link to="/login">Logout</Link>
            </li>
          </ul>
          );
      }
}


LogOutLink.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };
  const mapStateToProps = (state) => ({
    auth: state.auth,
  });
  export default connect(mapStateToProps, { logoutUser })(LogOutLink);
  