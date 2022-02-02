
import './login.css'
import React, { useState } from 'react';
import api from '../../Api';


import { BrowserRouter as Router } from "react-router-dom";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error:"",
            form_login: {
                email: "",
                password: ""
            }
        }


    }

    updateField = (e) => {
        var form_login = this.state.form_login;
        form_login[e.target.name] = e.target.value;
        this.setState({ form_login });
    }

    submit=async (e,)=>{
        e.preventDefault();
        const data={email:this.state.form_login.email,password:this.state.form_login.password
        }

        try{
            await api.loginUser(data)
            localStorage.getItem('authorization')
            console.log(localStorage.getItem('authorization'))
        }catch (err){
            this.setState({error:"Password ou Email errado"})
        }
    }
   

    render() {
        return (
            <div class="container">
                <div class="screen">
                    <div class="screen__content">
                        <form class="login" onSubmit={this.submit}>
                            <div class="login__field">
                                <i class=""></i>
                                <input type="text" name='email' value={this.state.form_login.email} class="login__input" placeholder="Utilizador/Email" onChange={(e) => this.updateField(e)}></input>
                            </div>
                            <div class="login__field">
                                <i class=""></i>
                                <input type="password" name='password' value={this.state.form_login.password} class="login__input" placeholder="Palavra-Passe" onChange={(e) => this.updateField(e)}></input>
                            </div>
                            <p className={'ErrorMensage'}>{(this.state.error==="")?(""):(this.state.error)}</p>
                            <button onClick={this.submit} class="button login__submit">
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
