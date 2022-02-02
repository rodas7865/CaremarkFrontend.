
import React, { useReducer, useState } from 'react';
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
