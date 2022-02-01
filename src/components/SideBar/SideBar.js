import "../SideBar/SideBar.css";
import React, { useState } from 'react';
import logo from '../../assets/logo.png'


class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        const showMenu = function open() {
            document.getElementById("sidebar").style.display = "block";
        }
        const hideMenu = function close() {
            document.getElementById("sidebar").style.display = "none";
        }


    }

    render() {
        return (
            //className={sidebaropen ? "sidebar-responsive" : ""}
            <div id="sidebar" >
                <div className="sidebar_title">
                    <div className="sidebar_img">
                        <img src={logo} alt="logo"></img>
                        <h1>CareMark</h1>
                    </div>
                    <i className="fa fa-times" id="sidebar_Icon" ></i>
                </div>
                <div className="sidebar_menu">
                    <div className="sidebar_link active_menu_link">
                        <i className="fa fa-home"></i>
                        <a href="#">Dashboard</a>
                    </div>
                    <h2>Gerenciar Utilizadores</h2>
                    <div className="sidebar_link">
                        <i className="fa fa-user-secret"></i>
                        <a href="#">Registar Utilizadores</a>
                    </div>
                    <div className="sidebar_link">
                        <i className="fa fa-building-o"></i>
                        <a href="#">Adicionar Escala</a>
                    </div>
                </div>
            </div>
        )
    }

}

export default SideBar;