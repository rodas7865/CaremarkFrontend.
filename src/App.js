import './App.css';
import NavBar from './components/NavBar/NavBar.js'
import React, { useState } from 'react';
import SideBar from './components/SideBar/SideBar';
import Content from './components/Content';

import { BrowserRouter as Router} from "react-router-dom";


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
            <NavBar></NavBar>
            <Content></Content>
            <SideBar></SideBar>
          </Router>
      </div>
    );
  }

}

export default App;
