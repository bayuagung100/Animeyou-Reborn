import React from 'react';
import './index.css';
import {
    // useRouteMatch,
    useParams
  } from "react-router-dom";
import EditGenre from './page-content/genre/EditGenre';
import EditProducer from './page-content/producer/EditProducer';
;

function IdSubPageContent(state, props) {
    
    let { pageContent } = useParams();
    let { form } = useParams();
    let { formId } = useParams();
    
    if (pageContent === 'anime' && form === 'edit-anime'){
        return <h3>edit anime</h3>;
    } else if (pageContent === 'genre' && form === 'edit-genre'){
        return <EditGenre id={formId}/>;
    } else if (pageContent === 'producer' && form === 'edit-producer'){
        return <EditProducer id={formId}/>;
    } 
    else {
        return <h3>Not Found</h3>
    }
}

export default IdSubPageContent;