import React, { Component } from "react";
import { Link } from "react-router-dom";
class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Build</b> a TODO app with the MERN stack <br /> from scratch
            </h4>
           
            <br />
            <div className="col s3 offset-s3">
                <Link
                  to="/register"
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                  }}
                  className="btn btn-large waves-effect waves-light hoverable black"
                >
                  Register
                </Link>
            </div>
            <div className="col s3">
                <Link
                  to="/login"
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                  }}
                  className="btn btn-large waves-effect waves-light hoverable black"
                >
                  Log In
                </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;
