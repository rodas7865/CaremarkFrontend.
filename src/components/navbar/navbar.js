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
import { withRouter } from "../hooks";
import api from '../../Api.js';


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };


  }

  login = () => {
    api.getUsers().then(result => {
      if (result === 'Acesso Negado') {
        return this.setState({ isLoggedIn: true })
      } else {
        return this.setState({ isLoggedIn: false })
      }
    })
  }
  logout = () => {
    localStorage.clear();
    window.location.reload(1);
  }
  componentDidMount() {
    //vai para component didmount
    this.login();
  }






  render() {
    let acao
    if (this.state.isLoggedIn) {
      acao = <NavBtnLink to={'/user/login'} >Log In</NavBtnLink>
    } else {
      acao = <NavBtnLink to={'/user/login'} onClick={this.logout}>Log Out</NavBtnLink>
    }
    return (
      <>
        <Nav>
          <NavLogo to="/dashboard">
            CareMark
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
              {acao}
            </NavBtn>
          </NavMenu>
        </Nav>
      </>
    );
  }

  
}


export default withRouter(NavBar);
