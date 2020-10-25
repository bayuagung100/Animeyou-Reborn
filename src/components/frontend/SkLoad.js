import React, { Component } from 'react';
import Header from './Header';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

class SkLoad extends Component {
  render() {
    
    return (
        <div style={{ fontSize: 20, lineHeight: 2 }}>
            <h1>{this.props.title || <Skeleton duration={2} />}</h1>
            {this.props.body || <Skeleton count={10}/>}
        </div>
    );
  }
}

export default SkLoad;
