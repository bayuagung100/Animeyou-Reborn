import React from 'react';
import './index.css';
import {
    Switch,
    Route,
    withRouter,
    useRouteMatch,
    useParams
  } from "react-router-dom";

import IdSubPageContent from './IdSubPageContent';
import AddGenre from './page-content/genre/AddGenre';
import AddProducer from './page-content/producer/AddProducer';
import AddAnime from './page-content/anime/AddAnime';
function SubPageContent() {
    let match = useRouteMatch();
    let { pageContent } = useParams();
    let { form } = useParams();
    
    if(pageContent === 'anime'){
        if (form === 'add-anime') {
            return <AddAnime/>;
        } else if(form === 'edit-anime'){
            return (
                <Switch>
                    <Route path={`${match.path}/:formId`}>
                        <IdSubPageContent />
                    </Route>
                    <Route path={match.path}>
                        <h3>Not Found</h3>
                    </Route>
                </Switch>
            );
        } else{
            return <h3>Not Found</h3>;
        }
    } else if(pageContent === 'genre'){
        if (form === 'add-genre') {
            return <AddGenre />;
        } else if(form === 'edit-genre'){
            return (
                <Switch>
                    <Route path={`${match.path}/:formId`}>
                        <IdSubPageContent />
                    </Route>
                    <Route path={match.path}>
                        <h3>Not Found</h3>
                    </Route>
                </Switch>
            );
        } else{
            return <h3>Not Found</h3>;
        }
    } else if(pageContent === 'producer'){
        if (form === 'add-producer') {
            return <AddProducer />;
        } else if(form === 'edit-producer'){
            return (
                <Switch>
                    <Route path={`${match.path}/:formId`}>
                        <IdSubPageContent />
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

export default withRouter(SubPageContent);