import './App.css';
import NavBar from './components/NavBar/NavBar.js'
import React, { useReducer, useState } from 'react';
import SideBar from './components/SideBar/SideBar';
import Content from './components/Content';
import Login from '../src/components/login/login'



import { BrowserRouter as Router,Routes,Route } from "react-router-dom";


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
          <Routes>
            <Route exact path={'/users/login'} element={<Login path="/users/login"></Login>}/>
            <Route exact path={'/calendar'} element={<Content></Content>}/>
          </Routes>
          {/* <NavBar></NavBar>
          <Content></Content>
          <SideBar></SideBar> */}
        </Router>
      </div>
    );
  }

}

export default App;
