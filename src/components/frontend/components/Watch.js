import React, { Component } from "react";
import { withRouter, Switch, Route } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import QueryString from 'query-string'

class Watch extends Component{
    constructor(props) {
        super(props);
        this.state = {
            
        };
        
    }
    componentDidMount(){
        console.log(this.props)
    }
    render() {
        const match = this.props.match.path;
        console.log("Watch: "+match)
    
        const queryString = QueryString.parse(this.props.location.search);
        console.log(queryString)
        
        return (
            <div>
                <Header/>
                <br/>
                <br/>
                <br/>
                Watch : {queryString.v}
                <Footer/>
            </div>
        )
    }
}

export default Watch;