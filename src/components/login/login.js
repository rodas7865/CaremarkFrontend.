
import '../login/login.css'
import React, { useState } from 'react';


import { BrowserRouter as Router } from "react-router-dom";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            }


    }

    render() {
        return (
            <div class="container">
                <div class="screen">
                    <div class="screen__content">
                        <form class="login">
                            <div class="login__field">
                                <i class=""></i>
                                <input type="text" name='' class="login__input" placeholder="Utilizador/Email"></input>
                            </div>
                            <div class="login__field">
                                <i class=""></i>
                                <input type="password" name='' class="login__input" placeholder="Palavra-Passe"></input>
                            </div>
                            <button class="button login__submit">
                                <span class="button__text">Login</span>
                                <i class=""></i>
                            </button>
                        </form>

                    </div>
                    <div class="screen__background">
                        <span class="screen__background__shape screen__background__shape4"></span>
                        <span class="screen__background__shape screen__background__shape3"></span>
                        <span class="screen__background__shape screen__background__shape2"></span>
                        <span class="screen__background__shape screen__background__shape1"></span>
                    </div>
                </div>
            </div>
        );
    }

}

export default App;
