import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { apiV1, apiV2, clientKey, uAPI } from '../lib/Config';
import { base64_encode } from '../lib/Func';
import Loader from 'react-loader-spinner';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            login: localStorage.rememberMe ? true : false,
            loader: false,
            rememberMe: false,
        };
        this.onChange = this.onChange.bind(this);
        // this.inputChange = this.inputChange.bind(this);
        this.onChangeRemember = this.onChangeRemember.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onChangeRemember(e) {
        this.setState({
            rememberMe: e.target.checked
        })
    }
    async onSubmit(e) {
        e.preventDefault();
        await this.setState({
            loader: true
        })
        await axios.post(uAPI + apiV2 + 'reqToken', null, {
            headers: {
                'Authorization': `Bearer ${base64_encode(clientKey)}`
            }
        })
            .then(response => {
                console.log(response)
                return response.data.accessToken;
            })
            .then(accessToken => {
                axios.post(uAPI + apiV2 + 'auth', {
                    username: this.state.username,
                    password: this.state.password
                }, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
                    .then(response => {
                        // console.log(response)
                        return response.data;
                    })
                    .then(JsonData => {
                        this.setState({
                            login: true,
                            accessToken: accessToken,
                            detailLogin: JsonData.data
                        })
                        if (this.state.rememberMe) {
                            localStorage.rememberMe = this.state.rememberMe
                        }
                    })
                    .catch(error => {
                        if (error.response) {
                            // The request was made and the server responded with a status code
                            // that falls out of the range of 2xx
                            // console.log(error.response.data);
                            // console.log(error.response.status);
                            if (error.response.status) {
                                this.setState({
                                    message: error.response.data.message,
                                    loader: false,
                                })
                            }
                            // console.log(error.response.headers);
                        }
                        // else if (error.request) {
                        //     // The request was made but no response was received
                        //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        //     // http.ClientRequest in node.js
                        //     console.log(error.request);
                        // } else {
                        //     // Something happened in setting up the request that triggered an Error
                        //     console.log('Error', error.message);
                        // }
                        // console.log(error.config);
                    });
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    if (error.response.status) {
                        this.setState({
                            message: error.response.data.message,
                            loader: false,
                        })
                    }
                    // console.log(error.response.headers);
                }
                // else if (error.request) {
                //     // The request was made but no response was received
                //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                //     // http.ClientRequest in node.js
                //     console.log(error.request);
                // } else {
                //     // Something happened in setting up the request that triggered an Error
                //     console.log('Error', error.message);
                // }
                // console.log(error.config);
            })


    }

    componentDidMount() {
        console.log(this.state.login)
    }

    render() {
        if (this.state.login === true) {
            return (<Redirect to={{
                pathname: "/admin",
                state: {
                    login: this.state.login,
                    detailLogin: this.state.detailLogin
                }
            }} />)
        }
        return (
            <div className="hold-transition login-page">
                <div className="login-box">
                    <div className="card">
                        <div className="card-body login-card-body">
                            <p className="login-box-msg">Sign in to start your session</p>
                            {this.state.message ? (<div className="alert alert-danger alert-dismissible">{this.state.message}</div>) : (<div></div>)}
                            <form onSubmit={this.onSubmit}>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" name="username" value={this.state.username} placeholder="Username" onChange={this.onChange} required />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <FontAwesomeIcon icon={faEnvelope} />
                                        </div>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="password" className="form-control" name="password" value={this.state.password} placeholder="Password" onChange={this.onChange} required />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <FontAwesomeIcon icon={faLock} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 remember-me" style={{ textAlign: 'left' }}>
                                    <label>
                                        <input type="checkbox" checked={this.state.rememberMe} name="remember" onChange={this.onChangeRemember} /> Remember me
                                    </label>
                                </div>
                                {
                                    this.state.loader ? (
                                        <div className="text-center">
                                            <Loader type="Circles" color="#00BFFF" height={30} width={100} />
                                        </div>
                                    ) : (
                                            <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                                        )
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;