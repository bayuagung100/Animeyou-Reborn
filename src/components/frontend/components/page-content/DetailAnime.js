import React from 'react';
import {
    Switch,
    Route,
    withRouter,
    useRouteMatch,
    useParams
  } from "react-router-dom";


function DetailAnime() {
    let match = useRouteMatch();
    let { animeId } = useParams(); //animeId
    console.log(match)
    console.log("DetailAnime: "+animeId)
    return <div>ini detail animenya: {animeId}</div>;
    // if(pageContent === 'anime'){
    //     return (
    //         <Switch>
    //             <Route path={`${match.path}/:form`}>
    //                 <SubPageContent />
    //             </Route>
    //             <Route path={match.path}>
    //                 <Anime tbl='animelist'/>
    //             </Route>
    //         </Switch>
    //     );
    // } else if(pageContent === 'genre'){
    //     return (
    //         <Switch>
    //             <Route path={`${match.path}/:form`}>
    //                 <SubPageContent />
    //             </Route>
    //             <Route path={match.path}>
    //                 <Genre tbl='genrelist'/>
    //             </Route>
    //         </Switch>
    //     );
    // } else if(pageContent === 'producer'){
    //     return (
    //         <Switch>
    //             <Route path={`${match.path}/:form`}>
    //                 <SubPageContent />
    //             </Route>
    //             <Route path={match.path}>
    //                 <Producer tbl='producerlist'/>
    //             </Route>
    //         </Switch>
    //     );
    // } else {
    //     return <h3>Not Found</h3>;
    // }
}

export default withRouter(DetailAnime);