import React, { Component } from "react";
import "../css/watch.scss";
import { withRouter, Switch, Route } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import QueryString from 'query-string'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

class Watch extends Component{
    constructor(props) {
        super(props);
        const queryString = QueryString.parse(this.props.location.search);
        let query;
        if (queryString.v === undefined) {
            query = null;
        } else {
            query = queryString.v;
        }
        this.state = {
            queryV: query,
            iColapse: false,
        };
        this.iColapse = this.iColapse.bind(this);
    }
    iColapse(){
        this.setState({iColapse: !this.state.iColapse})
    }
    componentDidMount(){
    }
    render() {
        const match = this.props.match.path;
        console.log("Watch: "+match)
        return (
            <div>
                <Header/>
                <div className="watch-container approw">
                    <div className="appmain">
                        
                        <div className="appcol-7">
                            <div className="appmain-content">
                                <div className="ctPlayerWatch"></div>
                                {/* <div className="ctTitleWatch"></div> */}

                                <div className="TitleWatch">
                                    Watch : {this.state.queryV} 
                                </div>
                                <div className="BlockWatch">
                                    <div className="ViewWatch">
                                        10000 views
                                    </div>
                                    <div className="DotsWatch">
                                        .
                                    </div>
                                    <div className="UploadedWatch">
                                        1 days ago
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="appcol-5">
                            <div className="appmain-playlist approw">
                                <div className="playlistTitle">
                                    <div className="title">
                                        Playlist - {this.state.queryV} 
                                    </div>

                                    <button className="iColapse" onClick={this.iColapse}>
                                        {
                                            this.state.iColapse ? (
                                                <FontAwesomeIcon icon={faAngleDown} size="lg" className="icon"/>
                                            ):(
                                                <FontAwesomeIcon icon={faAngleUp} size="lg" className="icon"/>
                                            )
                                        }
                                    
                                    </button>
                                </div>
                                {
                                    this.state.iColapse ? null:(
                                    <div className="playlistItems">
                                        <div className="ctItems"></div>

                                        <div className="ctItems"></div>
                                        <div className="ctItems"></div>
                                        <div className="ctItems"></div>
                                        <div className="ctItems"></div>
                                        
                                    </div>
                                    )
                                }
                                
                                
                            </div>
                        </div>
                        
                    </div>
                </div>
                
                <Footer/>
            </div>
        )
    }
}

export default Watch;