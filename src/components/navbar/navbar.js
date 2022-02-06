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
} from "./navbarstyle.js";
import {withRouter} from "../hooks";


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: this.checkLog,
    };


  }

  checkLog=()=>{
    let dados=localStorage.getItem('token');
    console.log(dados)
    if(dados ===''){
      return  console.log("login"+dados),false
    } else {
      return console.log("logout"+dados),true
    }
  }

  loggin=()=> {
    if (this.state.isLoggedIn() === true) {
      this.setState(this.isLoggedIn)
    }
    console.log("Login"+this.state.isLoggedIn)
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
              <NavBtnLink to={'/user/login'} onClick={this.checkLog()}  >{(this.loggin() === true)?('Log Out'):('Log In')}</NavBtnLink>
            </NavBtn>
          </NavMenu>
        </Nav>
      </>
    );
  }

}

export default withRouter(NavBar);
