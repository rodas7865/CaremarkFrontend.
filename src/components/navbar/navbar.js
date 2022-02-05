import React, { useReducer, useState } from 'react';
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
              activeStyle={{ color: 'black'}}
            >
              Calendar
            </NavLink>
          </NavMenu>
        </Nav>
      </>
    );
  }

}

export default withRouter(NavBar);
