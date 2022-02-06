
import React, { useReducer, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import api from '../../Api.js'
import { withRouter } from '../hooks.js';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    


    render() {

        return (
            <div className="container">
                

            </div>
        );
    }

}

export default withRouter(Home);