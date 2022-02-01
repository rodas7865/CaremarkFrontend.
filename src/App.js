import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar/NavBar.js'
import React, { useState } from 'react';
import SideBar from './components/SideBar/SideBar';
import DashboardAdmin from './components/Dashboard_admin/DashboardAdmin';
import DemoApp from './components/Calendar/Calendar';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };


  }
  
  render() {
    return (
      <div className="container">
        <NavBar></NavBar>
        <DemoApp></DemoApp>
        <SideBar></SideBar>

      </div>
    );
  }

}

export default App;
