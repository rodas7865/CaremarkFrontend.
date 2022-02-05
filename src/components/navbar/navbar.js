import React, { useReducer, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Nav,
  NavLogo,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./navbarstyle";
import {withRouter} from "../hooks";


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: this.checkLog
    };


  }

  checkLog=()=>{
    if(localStorage.getItem('token') === ''){
      return false
    } else {
      return true
    }
  }

  loggin=()=> {
    if (this.state.isLoggedIn() === true) {
    }
  }


  render() {
    return (
      <>
        <Nav>
          <NavLogo to="/">
            Logo
          </NavLogo>
          <Bars />

          <NavMenu>
            <NavLink
              to="/dashboard"
              activeStyle={{ color: 'black' }}
            >
              Home
            </NavLink>
            <NavLink
              to="/users"
              activeStyle={{ color: 'black' }}
            >
              Users
            </NavLink>
            <NavLink
              to="/calendar"
              activeStyle={{ color: 'black' }}
            >
              Calendar
            </NavLink>
            <NavBtn>
              <NavBtnLink to={'/user/login'} onClick={this.loggin()} >{(this.state.isLoggedIn() === true)?('Log Out'):('Log In')}</NavBtnLink>
            </NavBtn>
          </NavMenu>
        </Nav>
      </>
    );
  }

}

export default withRouter(NavBar);
