import "../NavBar/NavBar.css";
import avatar from '../../assets/avatar.jpg'
import React, { useState } from 'react';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meunome: "Luís Pinto",
            project_name: "Mais Futebol"
        };
    }
    
    render() {
        return (
            <nav className="navbar">
                <div className="nav_icon" >
                    <i className="bar"></i>
                </div>
                <div className="navbar_left">
                    <a href="#">Subscritores</a>
                    <a href="#">Video</a>
                    <a className="active_link" href="#">Admin</a>
                </div>
                <div className="navbar_rigth">
                    <a href="#">
                        <i className="far fa-search"></i>
                    </a>

                    <a href="#">
                        <i className="far fa-clock"></i>
                    </a>

                    <a href="#">
                        <img width="30" src={avatar} alt="avatar"></img>
                    </a>

                </div>
            </nav>
        )
    }

}

export default NavBar;