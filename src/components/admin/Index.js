import React, { Component } from 'react';
import "./index.css";
import {
    Switch,
    Route,
    Redirect,
    Link,
    withRouter
} from "react-router-dom";
import PostType from "./PostType";
import MenuSide from "../lib/MenuSide";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faEye, faSignOutAlt, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'
import Dashboard from './page-content/Dashboard';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: this.props.location.state ? this.props.location.state.login : false,
            detailLogin: this.props.location.state ? this.props.location.state.detailLogin : null,
            path: this.props.history.location.pathname,
        }

        this.logout = this.logout.bind(this);
        this.active = this.active.bind(this);
    }

    async logout() {
        await Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!',
            allowOutsideClick: false
        }).then((result) => {
            if (result.value) {
                localStorage.removeItem("rememberMe");
                this.setState({
                    login: false,
                    detailLogin: null,
                })
            }
        })
    }

    active() {
        this.setState((state, props) => {
            return {
                path: props.location.pathname,
            };
        })
    }

    componentDidMount() {
        console.log("detailLogin", this.state.detailLogin)
    }

    render() {
        if (this.state.login === false || this.state.detailLogin === null) {
            return (<Redirect to="/auth" />)
        }
        const match = this.props.match.path;

        return (
            <div className="sidebar-mini layout-fixed layout-navbar-fixed">
                <div className="wrapper">
                    {/* Navbar */}
                    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="#" className="nav-link" data-widget="pushmenu" ><FontAwesomeIcon icon={faBars} /></Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to="/" className="nav-link" target="_blank"><FontAwesomeIcon icon={faEye} /> Website</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="#" className="nav-link" onClick={this.logout}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</Link>
                            </li>
                        </ul>
                    </nav>


                    {/* Main Sidebar Container */}
                    <aside className="main-sidebar sidebar-dark-primary elevation-4">
                        <Link className="brand-link" to="/admin" onClick={this.active}>
                            <span className="brand-text font-weight-light">Administrator</span>
                        </Link>

                        {/* Sidebar */}
                        <div className="sidebar">
                            {/* Sidebar Menu */}
                            <nav className="mt-2">
                                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                    {
                                        MenuSide.map((value, index) => {
                                            // console.log(value.active)
                                            return (
                                                <li key={index} className={"nav-item " + (value.child !== undefined ? 'has-treeview' : '')}>
                                                    <Link to={`${this.props.match.path}` + value.url} onClick={this.active} className={"nav-link " + (value.active.includes(this.state.path) ? 'active' : '')}>
                                                        {value.fa}
                                                        <p>
                                                            {value.title}
                                                            {
                                                                value.child !== undefined ? (
                                                                    <FontAwesomeIcon icon={faAngleDown} className="right" />
                                                                ) : null
                                                            }
                                                        </p>
                                                    </Link>
                                                    {
                                                        value.child !== undefined ? (
                                                            <ul className="nav nav-treeview">
                                                                {
                                                                    value.child.map((val, ind) => {
                                                                        return (
                                                                            <li key={ind} className="nav-item">
                                                                                <Link to={`${this.props.match.path}` + val.url} onClick={this.active} className={"nav-link " + (this.state.path === val.active ? 'active' : '')}>
                                                                                    {val.fa}
                                                                                    <p>
                                                                                        {val.title}
                                                                                    </p>
                                                                                </Link>
                                                                            </li>
                                                                        )
                                                                    })
                                                                }

                                                            </ul>
                                                        ) : null
                                                    }
                                                </li>
                                            );
                                        })
                                    }

                                </ul>
                            </nav>
                        </div>
                    </aside>


                    {/* Content Wrapper. Contains page content */}
                    <div className="content-wrapper">

                        <Switch>
                            <Route path={`${match}/:postType`}>
                                <PostType />
                            </Route>
                            <Route path={match}>
                                <Dashboard />
                            </Route>
                        </Switch>

                    </div>

                    {/* Content footer */}
                    <footer className="main-footer">
                        <strong>Copyright &copy; 2020 <a href="http://adminlte.io">Animeyou</a>.</strong>
                        All rights reserved.
                        <div className="float-right d-none d-sm-inline-block">
                            <b>Version</b> 1.0
                        </div>
                    </footer>
                </div>
            </div>
        );
    }
}

export default withRouter(Index);