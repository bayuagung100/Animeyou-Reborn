import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import App from './components/frontend/App';
import Login from './components/admin/Login';
import Admin from "./components/admin/Index";
import Search from './components/frontend/components/Search';
import {Context} from "./components/frontend/Context";
import Collection from './components/frontend/components/Collecton';

function Router() {
    return (
            <BrowserRouter>
                <Context>
                <Route path="/" exact component={App} />
                <Route path="/tab-movie" component={App} />
                <Route path="/tab-liveaction" component={App} />

                <Route path="/search" component={Search} />
                <Route path="/collection" component={Collection} />
                </Context>

                <Route path="/admin" component={Admin} />
                <Route path="/auth" component={Login} />
            </BrowserRouter>
    );
}


export default Router;
