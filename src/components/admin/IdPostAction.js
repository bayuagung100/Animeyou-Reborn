import React from 'react';
import './index.css';
import {
    // useRouteMatch,
    useParams
  } from "react-router-dom";
import EditGenre from './page-content/genre/EditGenre';
import EditProducer from './page-content/producer/EditProducer';
import EditAnime from './page-content/anime/EditAnime';
import EditEpisode from './page-content/anime/episode/EditEpisode';

function IdPostAction() {
    let { postType } = useParams();
    let { postAction } = useParams();
    let { postActionId } = useParams();
    // console.log(postActionId)
    if (postType === 'anime' && postAction === 'edit-anime'){
        return <EditAnime id={postActionId}/>;
    } else if (postType === 'anime-episode' && postAction === 'edit-episode'){
        return <EditEpisode id={postActionId}/>;
    } else if (postType === 'genre' && postAction === 'edit-genre'){
        return <EditGenre id={postActionId}/>;
    } else if (postType === 'producer' && postAction === 'edit-producer'){
        return <EditProducer id={postActionId}/>;
    } 
    else {
        return <h3>Not Found</h3>
    }
}

export default IdPostAction;