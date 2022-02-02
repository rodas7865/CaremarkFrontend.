<<<<<<< HEAD
import './App.css';
import React, { useReducer, useState } from 'react';
import Login from '../src/components/login/login'
import { BrowserRouter as Router } from "react-router-dom";
=======
import NavBar from './components/NavBar/NavBar.js'
import React, { useReducer, useState } from 'react';
import SideBar from './components/SideBar/SideBar';
import Calendar from './components/Calendar/Calendar';
import Login from '../src/components/login/login'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

>>>>>>> 5b6f247f76028dca98c9e8327bb397f426035943


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
            <Route path={"*"} element={<Login path="/users/login"></Login>}/>
            <Route exact path={'/calendar'} element={<Calendar></Calendar>}/>
          </Routes>
          {/* <NavBar></NavBar>
          <Content></Content>
           */}
        </Router>
      </div>
    );
  }

}

export default App;
