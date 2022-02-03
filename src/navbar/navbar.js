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
} from "../navbar/navbarstyle";


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: this.props.isLoggedIn
    };

    
  }




  render() {
    let islogged;
    if (this.state.isLoggedIn) {
      islogged = <NavLink
        to="/users/login"
        activeStyle={{ color: 'black' }}
      >
        Login
      </NavLink>
    } else {
      islogged = <NavLink
        to="/users/login"
        activeStyle={{ color: 'black' }}
      >
        Logout
      </NavLink>
    }



    return (
      <>
        <Nav>
          <NavLogo to="/">
            Logo
          </NavLogo>
          <Bars />

          <NavMenu>
            <NavLink
              to="/calendar"
              activeStyle={{ color: 'black' }}
            >
              Inicio
            </NavLink>
            <NavLink
              to="/users"
              activeStyle={{ color: 'black' }}
            >
              Utilizadores
            </NavLink>
            <NavLink
              to="/contact"
              activeStyle={{ color: 'black' }}
            >
              Contact
            </NavLink>
            {islogged}
            <NavBtn>
              <NavBtnLink to="/sign-up">Sign Up</NavBtnLink>
            </NavBtn>
          </NavMenu>
        </Nav>
      </>
    );
  }

}

export default NavBar;
