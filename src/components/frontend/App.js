import React, { Component } from 'react';
import "./css/app.scss";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  Link,
  withRouter
} from "react-router-dom";
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import {ThemeContext, themes, DarkMode} from './theme-context';

import {Context} from "./Context";

class App extends Component {
  constructor(props) {
    super(props);
    this.gelapClick = this.gelapClick.bind(this);
    this.terangClick = this.terangClick.bind(this);

    this.toggleTheme = () => {
      console.log("fungsi ini di click")
      this.setState(
        state => ({
          theme: state.theme === themes.dark ? themes.light : themes.dark,
        })
      );
    };
    

    // State also contains the updater function so it will
    // be passed down into the context provider
    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme,
      DarkMode: DarkMode,
      gelapClick: this.gelapClick,
      terangClick: this.terangClick,
    };
  }
  gelapClick(){
    localStorage.setItem("dark-mode", true) 
    this.setState({
        DarkMode: true,
    });
  }
  terangClick(){
    localStorage.removeItem("dark-mode");
    this.setState({
      DarkMode: false,
    });
  }
  render() {
    const { path } = this.props.match;
    const match = this.props.match.path;
    console.log("app:" + path);
    console.log("app:" + match);
    return (
        // <ThemeContext.Provider value={this.state}>
        //   <Header/>
        //   <Body path={path}/>
        //   <Footer path={path}/>
        // </ThemeContext.Provider>
        <div>
          <Header/>
          <Body path={path}/>
          <Footer path={path}/>
        </div>
    );
  }
}

export default withRouter(App);
