import './App.css';
import React, { useReducer, useState } from 'react';
import Login from '../src/components/login/login'
import { BrowserRouter as Router } from "react-router-dom";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {


    };

  }


  render() {
  
    return (
      <div className="container">
        <Router>
          <Login path="/users/login"></Login>
          {/* <NavBar></NavBar>
          <Content></Content>
           */}
        </Router>
      </div>
    );
  }

}

export default App;
