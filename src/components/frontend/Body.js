import React, { Component, Fragment } from 'react';
import "./css/body.scss";
import Media from 'react-media';
import Desktop from './mediascreen/home/Desktop';
import Tablet from './mediascreen/home/Tablet';
import LandscapeMobile from './mediascreen/home/LandscapeMobile';
import PortraitMobile from './mediascreen/home/PortraitMobile';
import {ThemeContext} from './theme-context';

import {MyContext} from "./Context";

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        };
    }
    componentDidMount() {
        // console.log(this.props)
    }
    
    render() {
        
        return (
            <MyContext.Consumer>
            {/* <ThemeContext.Consumer> */}
            {({DarkMode}) => (
            <div className={"body-container approw "+(DarkMode ? "dark-mode":"")}>
                <Media queries={{
                    desktop: "(min-width: 1025px)",
                    tablet: "(min-width: 768px) and (max-width: 1024px)",
                    landscapeMobile: "(min-width: 481px) and (max-width: 767px)",
                    portraitMobile: "(min-width: 320px) and (max-width: 480px)",
                }}>
                    {matches => (
                        <Fragment>
                            {matches.desktop && <Desktop />}
                            {matches.tablet && <Tablet path={this.props.path}/>}
                            {matches.landscapeMobile && <LandscapeMobile path={this.props.path}/>}
                            {matches.portraitMobile && <PortraitMobile path={this.props.path}/>}
                        </Fragment>
                    )}
                </Media>
            </div>
            )}
            {/* </ThemeContext.Consumer> */}
            </MyContext.Consumer>
        )
    }
}

export default Body;