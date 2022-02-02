import React from "react";
import {Routes,Route,} from "react-router-dom";
import Calendar from './Calendar/Calendar.js'
import Login from './login/login.js'
import ('../App.css')

export default class Content extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Routes>
                <Route exact path={'/login'} element={<Login></Login>}/>
                <Route exact path={'/calendar'} element={<Calendar></Calendar>}/>
            </Routes>
        );
    }

}