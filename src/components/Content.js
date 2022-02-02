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
            <div>
                <Calendar></Calendar>
            </div>
        );
    }

}