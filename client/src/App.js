import React, { Component } from "react";
import { BrowserRouter , Route } from "react-router-dom";
import Todo from './components/Todo';
import './App.css';
import Landing from './components/Layout/Landing';
import Navbar from './components/Layout/Navbar';
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;