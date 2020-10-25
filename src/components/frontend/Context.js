// import { createContext } from 'react';
import React, { Component, createContext } from 'react';

let theme = localStorage.getItem('dark-mode');
if (theme === null) {
    theme = false;
} else {
    theme = true;
}

export const MyContext = createContext();

export class Context extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DarkMode: theme,
            gelapClick: this.gelapClick,
            terangClick: this.terangClick,
        };
    }
    gelapClick = () => {
        localStorage.setItem("dark-mode", true) 
        this.setState({
            DarkMode: true,
        });
      }
      terangClick = () => {
        localStorage.removeItem("dark-mode");
        this.setState({
          DarkMode: false,
        });
      }

    componentDidMount(){
    }

    render() {
        return (
            //passing the state object as a value prop to all children
            <MyContext.Provider value={this.state}>
                {this.props.children}
            </MyContext.Provider>
        )
    }
}


export default MyContext;