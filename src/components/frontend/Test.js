import React, { Component } from 'react';
import {ThemeContext} from './theme-context';

class Test extends Component {
  render() {
    
    return (
        <ThemeContext.Consumer>
            {({DarkMode}) => (
                <div >
                    
                </div>
            )}
        </ThemeContext.Consumer>
    );
  }
}

export default Test;
