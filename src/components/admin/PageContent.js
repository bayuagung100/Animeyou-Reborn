import React from 'react';
import './index.css';
import {
    Switch,
    Route,
    withRouter,
    useRouteMatch,
    useParams
  } from "react-router-dom";

import Genre from './page-content/genre/Genre';
import SubPageContent from './SubPageContent';
import Producer from './page-content/producer/Producer';
import Anime from './page-content/anime/Anime';

function PageContent() {
    let match = useRouteMatch();
    let { pageContent } = useParams();
    if(pageContent === 'anime'){
        return (
            <Switch>
                <Route path={`${match.path}/:form`}>
                    <SubPageContent />
                </Route>
                <Route path={match.path}>
                    <Anime tbl='animelist'/>
                </Route>
            </Switch>
        );
    } else if(pageContent === 'genre'){
        return (
            <Switch>
                <Route path={`${match.path}/:form`}>
                    <SubPageContent />
                </Route>
                <Route path={match.path}>
                    <Genre tbl='genrelist'/>
                </Route>
            </Switch>
        );
    } else if(pageContent === 'producer'){
        return (
            <Switch>
                <Route path={`${match.path}/:form`}>
                    <SubPageContent />
                </Route>
                <Route path={match.path}>
                    <Producer tbl='producerlist'/>
                </Route>
            </Switch>
        );
    } else {
        return <h3>Not Found</h3>;
    }
}

export default withRouter(PageContent);