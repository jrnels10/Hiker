import React, { Component } from 'react';
import 'whatwg-fetch';
import axios from 'axios';
import {
    getFromStorage,
    setInStorage
} from "../../utils/storage";
import { Redirect } from 'react-router';
import Nav from "../Nav/Nav";
import codes from "./codes"

class SignUp extends Component {

    state = {
        isLoading: true,
        redirect: false,
        token: getFromStorage("Hiker"),
        error: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        adminCode: ''
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    validateEmail = email => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    handleFormSubmit = event => {
        event.preventDefault();
        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
            email: this.state.email
        }

        if(this.state.adminCode) {
            codes[0].codes.map(code => {
                if (code === this.state.adminCode) {
                    newUser.admin = true
                }
            })
        }

        if(!this.validateEmail(this.state.email)) {

            setTimeout(function() {
                this.setState({
                  error: ""
                })
              }.bind(this), 3000)

            
            return this.setState({
                error: "Not a valid email"
            })
        }

        if(!this.state.firstName) {
            setTimeout(function() {
                this.setState({
                  error: ""
                })
              }.bind(this), 3000)

            return this.setState({
                error: "You need a first name"
            })
        }
        if(!this.state.lastName) {
            setTimeout(function() {
                this.setState({
                  error: ""
                })
              }.bind(this), 3000)

            return this.setState({
                error: "You need a last name"
            })
        }
        if(!this.state.password) {
            setTimeout(function() {
                this.setState({
                  error: ""
                })
              }.bind(this), 3000)

            return this.setState({
                error: "You need a password"
            })
        }

        axios.post("/api/account/signup", newUser)
            .then(res => {

                axios.post("/api/account/signin", newUser)
                    .then(res => {
                        setInStorage("Hiker", res.data.token);
                        this.setState({
                            token: res.data.token,
                            redirect: true
                        })
                    }).catch(err => {
                        console.log(err);
                    })
            }).catch(err => {
                console.log(err);
            })
    }


    render() {
        // document.body.style = "";
        if (this.state.redirect) {
            return <Redirect to='/emergency' />;
        }
        return (
            <div>
                <Nav onClick={this.handleClick} token={this.state.token}/>
                <h3 className="text-danger">{this.state.error}</h3>
                <form className="main-form">
                    <input type="text" placeholder="First Name" className="main-text-box" value={this.state.firstName} name="firstName" onChange={this.handleInputChange} />
                    <input type="text" placeholder="Last Name" className="main-text-box" value={this.state.lastName} name="lastName" onChange={this.handleInputChange} />
                    <input type="text" placeholder="Email" className="main-text-box" value={this.state.email} name="email" onChange={this.handleInputChange} />
                    <input type="password" placeholder="Password" className="main-text-box" value={this.state.password} name="password" onChange={this.handleInputChange} />
                    <input type="text" placeholder="Admin Code(optional)" className="main-text-box" value={this.state.adminCode} name="adminCode" onChange={this.handleInputChange} />
                    <input type="submit" className="main-btn" onClick={this.handleFormSubmit} />
                </form>
            </div >
        );
    }

}

export default SignUp;