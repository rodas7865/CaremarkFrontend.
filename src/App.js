import NavBar from './components/NavBar/NavBar.js'
import React, { useReducer, useState } from 'react';
import SideBar from './components/SideBar/SideBar';
import Calendar from './components/Calendar/Calendar';
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
            <Route exact path={'/calendar'} element={<Calendar></Calendar>}/>
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
