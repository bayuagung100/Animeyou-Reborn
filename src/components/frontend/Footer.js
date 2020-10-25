import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./css/footer.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faList } from '@fortawesome/free-solid-svg-icons';
// import {ThemeContext} from './theme-context';

import {MyContext} from "./Context";

class Footer extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            homeclass: `${this.props.path === "/" || this.props.path === "/tab-movie" || this.props.path === "/tab-liveaction"? ("active") : ("")}`,
            searchclass: `${this.props.path === "/search" ? ("active") : ("")}`,
            collectionclass: `${this.props.path === "/collection" ? ("active") : ("")}`,
        };
        this.homeActive = this.homeActive.bind(this);
        this.searchActive = this.searchActive.bind(this);
        this.collectionActive = this.collectionActive.bind(this);
    }
    homeActive() {
        this.setState((state, props) => {
            return {
                homeclass: "active",
                searchclass: "",
                collectionclass: "",
            };
        });
    }
    searchActive() {
        this.setState((state, props) => {
            return {
                homeclass: "",
                searchclass: "active",
                collectionclass: "",
            };
        });
    }
    collectionActive() {
        this.setState((state, props) => {
            return {
                homeclass: "",
                searchclass: "",
                collectionclass: "active",
            };
        });
    }
    render() {
        return (
            <MyContext.Consumer>
            {/* <ThemeContext.Consumer> */}
            {({DarkMode}) => (
            <div className={"footer-container "+(DarkMode ? "dark-mode":"")}>
                {/* <div className="approw"> */}
                    {
                        this.state.homeclass ? (
                        <div className="approw">
                            <div className="appcol-4 text-center footer-menu">
                                <div className="menu">
                                    <Link to="/" onClick={this.homeActive}>
                                        <FontAwesomeIcon icon={faHome} size="lg" className={"menu-icon " + this.state.homeclass}/>
                                        <div className={"menu-text " + this.state.homeclass}>Home</div>
                                    </Link>
                                </div>
                            </div>
                            <div className="appcol-4 text-center footer-menu">
                                <div className="menu">
                                    <Link to="/search" onClick={this.searchActive}>
                                        <FontAwesomeIcon icon={faSearch} size="lg" className={"menu-icon " + this.state.searchclass}/>
                                        <div className={"menu-text " + this.state.searchclass}>Search</div>
                                    </Link>
                                    
                                </div>
                            </div>
                            <div className="appcol-4 text-center footer-menu">
                                <div className="menu">
                                    <Link to="/collection" onClick={this.collectionActive}>
                                        <FontAwesomeIcon icon={faList} size="lg" className={"menu-icon " + this.state.collectionclass}/>
                                        <div className={"menu-text " + this.state.collectionclass}>Collection</div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        ):(
                        <div className="approw">
                            <div className="appcol-4 text-center footer-menu">
                                <div className="menu">
                                    <Link to="/" onClick={this.homeActive}>
                                        <FontAwesomeIcon icon={faHome} size="lg" className={"menu-icon " + this.state.homeclass}/>
                                        <div className={"menu-text " + this.state.homeclass}>Home</div>
                                    </Link>
                                </div>
                            </div>
                            <div className="appcol-4 text-center footer-menu">
                                <div className="menu">
                                    <Link to="/search" onClick={this.searchActive}>
                                        <FontAwesomeIcon icon={faSearch} size="lg" className={"menu-icon " + this.state.searchclass}/>
                                        <div className={"menu-text " + this.state.searchclass}>Search</div>
                                    </Link>
                                    
                                </div>
                            </div>
                            <div className="appcol-4 text-center footer-menu">
                                <div className="menu">
                                    <Link to="/collection" onClick={this.collectionActive}>
                                        <FontAwesomeIcon icon={faList} size="lg" className={"menu-icon " + this.state.collectionclass}/>
                                        <div className={"menu-text " + this.state.collectionclass}>Collection</div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        )
                    }
                    {/* <div className="appcol-4 text-center footer-menu">
                        <div className="menu">
                            <FontAwesomeIcon icon={faHome} size="lg" className="menu-icon active"/>
                            <div className="menu-text active">Home</div>
                        </div>
                        
                    </div>
                    <div className="appcol-4 text-center footer-menu">
                        <div className="menu">
                            <FontAwesomeIcon icon={faSearch} size="lg" className="menu-icon"/>
                            <div className="menu-text">Search</div>
                        </div>
                    </div>
                    <div className="appcol-4 text-center footer-menu">
                        <div className="menu">
                            <FontAwesomeIcon icon={faList} size="lg" className="menu-icon"/>
                            <div className="menu-text">Collection</div>
                        </div>
                    </div> */}
                {/* </div> */}
            </div>
            )}
            {/* </ThemeContext.Consumer> */}
            </MyContext.Consumer>
        )
    }
}

export default Footer;