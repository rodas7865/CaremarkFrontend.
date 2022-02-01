import "../Dashboard_admin/DashboardAdmin.css";
import React, { useState } from 'react';

class DashboardAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            //className={sidebaropen ? "sidebar-responsive" : ""}
            <main>
            <div className="main_container">
                <div className="main_title">
                    <img alt="Bem-Vindo"></img>
                    <div className="main_greeting">
                        <h1>Olá CareMark</h1>
                        <p>Bem-vindo ao seu Hospital</p>
                    </div>
                </div>
                <div className="main_cards">
                    <div className="card">
                        <i className="fa "></i>
                        <div className="card_inner">
                            <p className="text-primary-p">Numero1</p>
                            <span className="font-bold text-title">24</span>
                        </div>
                    </div>
                    <div className="card">
                    <i class="fa fa-user-o fa-2x text-ligthblue"></i>
                        <div className="card_inner">
                            <p className="text-primary-p">Numero2</p>
                            <span className="font-bold text-title">25</span>
                        </div>
                    </div>
                    <div className="card">
                        <i className="fa "></i>
                        <div className="card_inner">
                            <p className="text-primary-p">Numero3</p>
                            <span className="font-bold text-title">25</span>

                        </div>
                    </div>

                    <div className="card">
                        <i className="fa "></i>
                        <div className="card_inner">
                            <p className="text-primary-p">Numero4</p>
                            <span className="font-bold text-title">26</span>
                        </div>
                    </div>
                </div>
            </div>
            </main>
        )
    }

}

export default DashboardAdmin;