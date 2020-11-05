import React from 'react';
import './index.css';
import {
    Switch,
    Route,
    withRouter,
    useRouteMatch,
    useParams
  } from "react-router-dom";

import IdPostAction from './IdPostAction';
import AddGenre from './page-content/genre/AddGenre';
import AddProducer from './page-content/producer/AddProducer';
import AddAnime from './page-content/anime/AddAnime';
import AddEpisode from './page-content/anime/episode/AddEpisode';

function PostAction() {
    let match = useRouteMatch();
    let { postType } = useParams();
    let { postAction } = useParams();
    console.log(match)
    console.log(postAction)
    if(postType === 'anime'){
        if (postAction === 'add-anime') {
            return <AddAnime/>;
        } else if(postAction === 'edit-anime'){
            return (
                <Switch>
                    <Route path={`${match.path}/:postActionId`}>
                        <IdPostAction />
                    </Route>
                    <Route path={match.path}>
                        <h3>Not Found</h3>
                    </Route>
                </Switch>
            );
        } else{
            return <h3>Not Found</h3>;
        }
    } if(postType === 'anime-episode'){
        if(postAction === 'add-episode'){
            return <AddEpisode/>;
        } else if(postAction === 'edit-episode'){
            return (
                <Switch>
                    <Route path={`${match.path}/:postActionId`}>
                        <IdPostAction />
                    </Route>
                    <Route path={match.path}>
                        <h3>Not Found</h3>
                    </Route>
                </Switch>
            );
        } else{
            return <h3>Not Found</h3>;
        }
    } else if(postType === 'genre'){
        if (postAction === 'add-genre') {
            return <AddGenre />;
        } else if(postAction === 'edit-genre'){
            return (
                <Switch>
                    <Route path={`${match.path}/:postActionId`}>
                        <IdPostAction />
                    </Route>
                    <Route path={match.path}>
                        <h3>Not Found</h3>
                    </Route>
                </Switch>
            );
        } else{
            return <h3>Not Found</h3>;
        }
    } else if(postType === 'producer'){
        if (postAction === 'add-producer') {
            return <AddProducer />;
        } else if(postAction === 'edit-producer'){
            return (
                <Switch>
                    <Route path={`${match.path}/:postActionId`}>
                        <IdPostAction />
                    </Route>
                    <Route path={match.path}>
                        <h3>Not Found</h3>
                    </Route>
                </Switch>
            );
        } else{
            return <h3>Not Found</h3>;
        }
    } else {
        return <h3>Not Found</h3>;
    }
}

export default withRouter(PostAction);