import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import NaviUpdateTerbaru from '../../components/portraitmobile/NaviUpdateTerbaru';
import NaviMovie from '../../components/portraitmobile/NaviMovie';
import NaviLiveAction from '../../components/portraitmobile/NaviLiveAction';

class PortraitMobile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateclass: `${this.props.path === "/" ? ("active") : ("")}`,
            movieclass: `${this.props.path === "/tab-movie" ? ("active") : ("")}`,
            laclass: `${this.props.path === "/tab-liveaction" ? ("active") : ("")}`,
        };

        this.updateActive = this.updateActive.bind(this);
        this.movieActive = this.movieActive.bind(this);
        this.laActive = this.laActive.bind(this);

    }
    updateActive() {
        this.setState((state, props) => {
            return {
                updateclass: "active",
                movieclass: "",
                laclass: ""
            };
        });
    }
    movieActive() {
        this.setState((state, props) => {
            return {
                updateclass: "",
                movieclass: "active",
                laclass: ""
            };
        });
    }
    laActive() {
        this.setState((state, props) => {
            return {
                updateclass: "",
                movieclass: "",
                laclass: "active"
            };
        });
    }

    componentDidMount() {
        // console.log(this.props)
    }
    render() {
        return (
            // media (min-width: 320px) and (max-width: 480px)
            <div className="appmain4">
                <div className="appmain-content4">
                    
                {
                        this.state.updateclass ? (
                            <div className="scroll-navigation">
                                <div className={"text-center appmain-navigation " + this.state.updateclass}>
                                    <div className="menu">
                                        <Link to="/" className="menu-text" onClick={this.updateActive}>Update Terbaru</Link>
                                    </div>
                                </div>
                                <div className={"text-center appmain-navigation " + this.state.movieclass}>
                                    <div className="menu">
                                        <Link to="/tab-movie" className="menu-text" onClick={this.movieActive}>Movie</Link>
                                    </div>
                                </div>
                                <div className={"text-center appmain-navigation " + this.state.laclass}>
                                    <div className="menu">
                                        <Link to="/tab-liveaction" className="menu-text" onClick={this.laActive}>Live Action</Link>
                                    </div>
                                </div>
                            </div>
                        ):(
                            <div className="scroll-navigation">
                                <div className={"text-center appmain-navigation " + this.state.updateclass}>
                                    <div className="menu">
                                        <Link to="/" className="menu-text" onClick={this.updateActive}>Update Terbaru</Link>
                                    </div>
                                </div>
                                <div className={"text-center appmain-navigation " + this.state.movieclass}>
                                    <div className="menu">
                                        <Link to="/tab-movie" className="menu-text" onClick={this.movieActive}>Movie</Link>
                                    </div>
                                </div>
                                <div className={"text-center appmain-navigation " + this.state.laclass}>
                                    <div className="menu">
                                        <Link to="/tab-liveaction" className="menu-text" onClick={this.laActive}>Live Action</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    
                    {
                        this.state.updateclass === "active" ? (
                            <NaviUpdateTerbaru />

                        ) : (
                                <div>
                                    <Route path="/tab-movie" component={NaviMovie} />
                                    <Route path="/tab-liveaction" component={NaviLiveAction} />
                                </div>
                            )
                    }

                    <div className="appmain-more">
                        <button className="more"><FontAwesomeIcon icon={faAngleDown} size="lg"/></button>
                    </div>
                </div>
            </div>
        )
    }
}

export default PortraitMobile;