
import React, { useReducer, useState } from 'react';
import Calendar from './components/Calendar/Calendar';
import Login from '../src/components/login/login'
import { BrowserRouter as Router,Routes,Route, NavLink } from "react-router-dom";
import NavBar from './navbar/navbar';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
    };
  }


  render() {
  
    return (
      <div className="container">
        
        <Router>
          <NavBar isLoggedIn={this.state.isLoggedIn}/>
          <Routes>
            <Route path={"*"} element={<Login isLoggedIn={this.state.isLoggedIn} path="/users/login"></Login>}/>
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
