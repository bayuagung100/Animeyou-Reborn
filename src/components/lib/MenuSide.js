import React from 'react';
import {Route} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faCog, faCircle, faCircleNotch, faFilm} from '@fortawesome/free-solid-svg-icons';
import Admin from '../admin/Index';


const MenuSide= [
    {
        title: "Dashboard",
        fa:  <FontAwesomeIcon icon={faTachometerAlt} style={{ marginRight:"6px"}}/> ,
        route: <Route path="/admin" component={Admin} />,
        url: "",
        active: ["/admin"],
    },
    {
        title: "Anime",
        fa: <FontAwesomeIcon icon={faFilm} style={{ marginRight:"6px"}}/> ,
        route: <Route path="/admin/anime" component={Admin} />,
        url: "#",
        active: ["/admin/anime","/admin/anime-episode",],
        child: [
        {
            title: "Daftar Anime",
            fa: <FontAwesomeIcon icon={faCircleNotch} style={{ marginRight:"6px"}}/> ,
            url: "/anime",
            active: "/admin/anime",
        },
        {
            title: "Episode",
            fa: <FontAwesomeIcon icon={faCircleNotch} style={{ marginRight:"6px"}}/> ,
            url: "/anime-episode",
            active: "/admin/anime-episode",
        },
        ]
    },
    {
        title: "Genre",
        fa: <FontAwesomeIcon icon={faCog} style={{ marginRight:"6px"}}/> ,
        route: <Route path="/admin/genre" component={Admin} />,
        url: "/genre",
        active: ["/admin/genre"],
    },
    {
        title: "Producer",
        fa: <FontAwesomeIcon icon={faCog} style={{ marginRight:"6px"}}/> ,
        route: <Route path="/admin/producer" component={Admin} />,
        url: "/producer",
        active: ["/admin/producer"],
    },
    {
        title: "Setting",
        fa: <FontAwesomeIcon icon={faCog} style={{ marginRight:"6px"}}/> ,
        route: <Route path="/admin/setting" component={Admin} />,
        url: "/setting",
        active: ["/admin/setting"],
    },
];

export default MenuSide;
