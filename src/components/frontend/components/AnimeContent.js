import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import DetailAnime from './page-content/DetailAnime';

class AnimeContent extends Component {
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
    console.log("AnimeContent: "+match)
    return (
      <div>
        <Header/>
        <br/>
        <br/>
        <br/>
        <Switch>
          <Route path={`${match}/:animeId`}>
              <DetailAnime/>
          </Route>
          <Route path={match}>
            <div>Ini page Animenya</div>
          </Route>
        </Switch>
        <Footer/>
      </div>
    )
  }
}

export default withRouter(AnimeContent);