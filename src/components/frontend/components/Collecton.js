import React, { Component } from 'react';
import {MyContext} from "../Context";
import Header from '../Header';
import Footer from '../Footer';

  


class Collection extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    componentDidMount(){
    }
    render() {
        const { path } = this.props.match;
        return (
            <div>
                <Header/>
                <Footer path={path}/>
            </div>
        )
    }
}
export default Collection;