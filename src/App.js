
import React, { useReducer, useState } from 'react';
import Calendar from './components/Calendar/Calendar';
import Login from '../src/components/login/login.js'
import { BrowserRouter as Router,Routes,Route, NavLink } from "react-router-dom";
import NavBar from './components/navbar/navbar';
import User from "./components/Users/User";
import Home from './components/home/home';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     user:{},
    };
  }
  updateUser = (user) => {
    this.setState({
      user,
    });
  };

  render() {
  
    return (
      <div className="container">
        
        <Router>
        <NavBar isLoggedIn={this.state.isLoggedIn}/>
          <Routes>
            <Route path={"*"} element={<Login user={this.state.user} updateUser={this.updateUser} path="/users/login"></Login>}/>
            <Route path={"/dashboard"} element={<Home></Home>}/>
            <Route exact path={'/calendar'} element={<Calendar></Calendar>}/>
            <Route exact path={'/users'} element={<User></User>}/>
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
