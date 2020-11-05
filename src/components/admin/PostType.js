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
import PostAction from './PostAction';
import Producer from './page-content/producer/Producer';
import Anime from './page-content/anime/Anime';
import Episode from './page-content/anime/episode/Episode';

function PostType() {
    let match = useRouteMatch();
    let { postType } = useParams();
    console.log(postType)
    if(postType === 'anime'){
        return (
            <Switch>
                <Route path={`${match.path}/:postAction`}>
                    <PostAction />
                </Route>
                <Route path={match.path}>
                    <Anime tbl='animelist'/>
                </Route>
            </Switch>
        );
    } else if(postType === 'anime-episode'){
        return (
            <Switch>
                <Route path={`${match.path}/:postAction`}>
                    <PostAction />
                </Route>
                <Route path={match.path}>
                    <Episode tbl='animeepisodelist'/>
                </Route>
            </Switch>
        );
    } else if(postType === 'genre'){
        return (
            <Switch>
                <Route path={`${match.path}/:postAction`}>
                    <PostAction />
                </Route>
                <Route path={match.path}>
                    <Genre tbl='genrelist'/>
                </Route>
            </Switch>
        );
    } else if(postType === 'producer'){
        return (
            <Switch>
                <Route path={`${match.path}/:postAction`}>
                    <PostAction />
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

export default withRouter(PostType);