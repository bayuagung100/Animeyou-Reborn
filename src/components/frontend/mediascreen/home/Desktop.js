import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Updated from "../../dummy/Updated";
import Movie from "../../dummy/Movie";
import LiveAction from '../../dummy/LiveAction';
import Sidebar from '../../Sidebar';
import { Link } from 'react-router-dom';
import axios from 'axios';

const uAPIlocal = 'http://'+window.location.hostname+':8080';


class Desktop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingUpdated: false,
            updated: [],
            loadingMovie: false,
            movie: [],
            loadingLiveAction: false,
            liveaction: [],

            itemsUpdated: 6,
            loadingStateUpdated: false,
        };
        this.getDummy = this.getDummy.bind(this);
        this.displayItems = this.displayItems.bind(this);
    }
    displayItems() {
        this.setState({ loadingStateUpdated: true });
        setTimeout(() => {
            this.setState({ itemsUpdated: this.state.itemsUpdated+6, loadingStateUpdated: false });
        }, 3000);

    }    
    getDummy(){
        axios.get(uAPIlocal+'/api/v1/front/updated')
        .then(function(response) {
            return response.data.results;
        })
        .then(response => {
            this.setState({
                updated: response
            },()=>console.log(this.state.updated))
        })
        .catch(function (error) {
            console.log(error);
        });
        setTimeout(()=>{
            this.setState({
                loadingUpdated: true,
                // updated: Updated,
                loadingMovie: true,
                movie: Movie,
                loadingLiveAction: true,
                liveaction: LiveAction,
            })
        }, 3000);
        // Updated.map((value, index) => {
        //     console.log(value)
        // })
        // console.log(Updated)
    }
    componentDidMount(){
        this.getDummy();
    }
    render() {
        return (
            //media (min-width: 1025px)
            <div className="appmain">
                <div className="appcol-8">
                    <div className="appmain-content">
                        <div className="appmain-title">
                            Update Terbaru
                        </div>
                        {
                            this.state.loadingUpdated ? (
                                <div className="approw">
                                    {
                                        this.state.updated.slice(0, this.state.itemsUpdated).map((value, index)=>{

                                            return(
                                                <div key={index} className="appcol-4">
                                                    <div className="appmain-items">
                                                        <Link to={`/watch?v=${value.episodeUrl}`}>
                                                            <div className="appmain-itemsImg">
                                                                <img src={uAPIlocal+'/'+value.episodeGambar} alt={value.episodeJudul} />
                                                            </div>
                                                        </Link>
                                                        <div className="appmain-itemsBlock1">
                                                            <Link to={`/anime/${value.animeUrl}`}>
                                                                <div className="appmain-itemsAnimeImg">
                                                                    <img src={uAPIlocal+'/'+value.animeGambar} alt={value.animeJudul} />
                                                                </div>
                                                            </Link>
                                                            <Link to={`/watch?v=${value.episodeUrl}`}>
                                                                <div className="appmain-itemsTitleEpisode">
                                                                    {value.episodeJudul}
                                                                </div>
                                                            </Link>
                                                        </div>
                                                        <div className="appmain-itemsBlock2">
                                                            <Link to={`/anime/${value.animeUrl}`}>
                                                            <div className="appmain-itemsAnimeTitle">
                                                                {value.animeJudul}
                                                            </div>
                                                            </Link>
                                                            <div className="appmain-itemsViews">
                                                                {value.episodeViews} views
                                                            </div>
                                                            <div className="appmain-itemsDots">
                                                                .
                                                            </div>
                                                            <div className="appmain-itemsUploaded">
                                                                {value.episodeUploads}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ):(
                                <div className="approw">
                                    <div className="appcol-4">
                                        <div className="appmain-items">
                                            <div className="appmain-ctitemsImg"></div>
                                            <div className="appmain-ctitemsBlock1">
                                                <div className="appmain-ctitemsAnimeImg"></div>
                                                <div className="appmain-ctitemsTitleEpisode"></div>
                                            </div>
                                            <div className="appmain-ctitemsBlock2">
                                                <div className="appmain-ctitemsAnimeTitle"></div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="appcol-4">
                                        <div className="appmain-items">
                                            <div className="appmain-ctitemsImg"></div>
                                            <div className="appmain-ctitemsBlock1">
                                                <div className="appmain-ctitemsAnimeImg"></div>
                                                <div className="appmain-ctitemsTitleEpisode"></div>
                                            </div>
                                            <div className="appmain-ctitemsBlock2">
                                                <div className="appmain-ctitemsAnimeTitle"></div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="appcol-4">
                                        <div className="appmain-items">
                                            <div className="appmain-ctitemsImg"></div>
                                            <div className="appmain-ctitemsBlock1">
                                                <div className="appmain-ctitemsAnimeImg"></div>
                                                <div className="appmain-ctitemsTitleEpisode"></div>
                                            </div>
                                            <div className="appmain-ctitemsBlock2">
                                                <div className="appmain-ctitemsAnimeTitle"></div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="appcol-4">
                                        <div className="appmain-items">
                                            <div className="appmain-ctitemsImg"></div>
                                            <div className="appmain-ctitemsBlock1">
                                                <div className="appmain-ctitemsAnimeImg"></div>
                                                <div className="appmain-ctitemsTitleEpisode"></div>
                                            </div>
                                            <div className="appmain-ctitemsBlock2">
                                                <div className="appmain-ctitemsAnimeTitle"></div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="appcol-4">
                                        <div className="appmain-items">
                                            <div className="appmain-ctitemsImg"></div>
                                            <div className="appmain-ctitemsBlock1">
                                                <div className="appmain-ctitemsAnimeImg"></div>
                                                <div className="appmain-ctitemsTitleEpisode"></div>
                                            </div>
                                            <div className="appmain-ctitemsBlock2">
                                                <div className="appmain-ctitemsAnimeTitle"></div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="appcol-4">
                                        <div className="appmain-items">
                                            <div className="appmain-ctitemsImg"></div>
                                            <div className="appmain-ctitemsBlock1">
                                                <div className="appmain-ctitemsAnimeImg"></div>
                                                <div className="appmain-ctitemsTitleEpisode"></div>
                                            </div>
                                            <div className="appmain-ctitemsBlock2">
                                                <div className="appmain-ctitemsAnimeTitle"></div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            )
                        }
                        
                        
                        <div className="appmain-more">
                            {
                                this.state.loadingStateUpdated ? (
                                    <p className='loading'>Loading...</p>
                                ):(
                                    this.state.itemsUpdated < this.state.updated.length && <button className="more" onClick={this.displayItems}><FontAwesomeIcon icon={faAngleDown} size="lg"/></button>
                                )
                            }
                            
                        </div>
                        
                    </div>

                    <div className="appmain-content">
                        <div className="appmain-title">
                            Movie
                        </div>
                        {
                            this.state.loadingMovie ? (
                                <div className="approw">
                                    {
                                        this.state.movie.map((value, index)=>{

                                            return(
                                                <div key={index} className="appcol-4">
                                                    <div className="appmain-items">
                                                        <div className="appmain-itemsImg">
                                                            <img src={value.image} alt={value.title} />
                                                        </div>
                                                        <div className="appmain-itemsBlock1">
                                                            <div className="appmain-itemsAnimeImg">
                                                                <img src={value.image} alt={value.title} />
                                                            </div>
                                                            <div className="appmain-itemsTitleEpisode">
                                                                {value.title}
                                                            </div>
                                                        </div>
                                                        <div className="appmain-itemsBlock2">
                                                            <div className="appmain-itemsAnimeTitle">
                                                                {value.anime}
                                                            </div>
                                                            <div className="appmain-itemsViews">
                                                                {value.views} views
                                                            </div>
                                                            <div className="appmain-itemsDots">
                                                                .
                                                            </div>
                                                            <div className="appmain-itemsUploaded">
                                                                {value.uploads}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ):(
                                <div className="approw">
                                    <div className="appcol-4">
                                        <div className="appmain-items">
                                            <div className="appmain-ctitemsImg"></div>
                                            <div className="appmain-ctitemsBlock1">
                                                <div className="appmain-ctitemsAnimeImg"></div>
                                                <div className="appmain-ctitemsTitleEpisode"></div>
                                            </div>
                                            <div className="appmain-ctitemsBlock2">
                                                <div className="appmain-ctitemsAnimeTitle"></div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="appcol-4">
                                        <div className="appmain-items">
                                            <div className="appmain-ctitemsImg"></div>
                                            <div className="appmain-ctitemsBlock1">
                                                <div className="appmain-ctitemsAnimeImg"></div>
                                                <div className="appmain-ctitemsTitleEpisode"></div>
                                            </div>
                                            <div className="appmain-ctitemsBlock2">
                                                <div className="appmain-ctitemsAnimeTitle"></div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="appcol-4">
                                        <div className="appmain-items">
                                            <div className="appmain-ctitemsImg"></div>
                                            <div className="appmain-ctitemsBlock1">
                                                <div className="appmain-ctitemsAnimeImg"></div>
                                                <div className="appmain-ctitemsTitleEpisode"></div>
                                            </div>
                                            <div className="appmain-ctitemsBlock2">
                                                <div className="appmain-ctitemsAnimeTitle"></div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="appcol-4">
                                        <div className="appmain-items">
                                            <div className="appmain-ctitemsImg"></div>
                                            <div className="appmain-ctitemsBlock1">
                                                <div className="appmain-ctitemsAnimeImg"></div>
                                                <div className="appmain-ctitemsTitleEpisode"></div>
                                            </div>
                                            <div className="appmain-ctitemsBlock2">
                                                <div className="appmain-ctitemsAnimeTitle"></div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="appcol-4">
                                        <div className="appmain-items">
                                            <div className="appmain-ctitemsImg"></div>
                                            <div className="appmain-ctitemsBlock1">
                                                <div className="appmain-ctitemsAnimeImg"></div>
                                                <div className="appmain-ctitemsTitleEpisode"></div>
                                            </div>
                                            <div className="appmain-ctitemsBlock2">
                                                <div className="appmain-ctitemsAnimeTitle"></div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="appcol-4">
                                        <div className="appmain-items">
                                            <div className="appmain-ctitemsImg"></div>
                                            <div className="appmain-ctitemsBlock1">
                                                <div className="appmain-ctitemsAnimeImg"></div>
                                                <div className="appmain-ctitemsTitleEpisode"></div>
                                            </div>
                                            <div className="appmain-ctitemsBlock2">
                                                <div className="appmain-ctitemsAnimeTitle"></div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            )
                        }
                        
                        
                        <div className="appmain-more">
                            <button className="more"><FontAwesomeIcon icon={faAngleDown} size="lg"/></button>
                        </div>
                        
                    </div>

                    <div className="appmain-content">
                        <div className="appmain-title">
                            Live Action
                        </div>
                        {
                            this.state.loadingLiveAction ? (
                                <div className="approw">
                                    {
                                        this.state.liveaction.map((value, index)=>{

                                            return(
                                                <div key={index} className="appcol-4">
                                                    <div className="appmain-items">
                                                        <div className="appmain-itemsImg">
                                                            <img src={value.image} alt={value.title} />
                                                        </div>
                                                        <div className="appmain-itemsBlock1">
                                                            <div className="appmain-itemsAnimeImg">
                                                                <img src={value.image} alt={value.title} />
                                                            </div>
                                                            <div className="appmain-itemsTitleEpisode">
                                                                {value.title}
                                                            </div>
                                                        </div>
                                                        <div className="appmain-itemsBlock2">
                                                            <div className="appmain-itemsAnimeTitle">
                                                                {value.anime}
                                                            </div>
                                                            <div className="appmain-itemsViews">
                                                                {value.views} views
                                                            </div>
                                                            <div className="appmain-itemsDots">
                                                                .
                                                            </div>
                                                            <div className="appmain-itemsUploaded">
                                                                {value.uploads}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ):(
                                <div className="approw">
                                    <div className="appcol-4">
                                        <div className="appmain-items">
                                            <div className="appmain-ctitemsImg"></div>
                                            <div className="appmain-ctitemsBlock1">
                                                <div className="appmain-ctitemsAnimeImg"></div>
                                                <div className="appmain-ctitemsTitleEpisode"></div>
                                            </div>
                                            <div className="appmain-ctitemsBlock2">
                                                <div className="appmain-ctitemsAnimeTitle"></div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="appcol-4">
                                        <div className="appmain-items">
                                            <div className="appmain-ctitemsImg"></div>
                                            <div className="appmain-ctitemsBlock1">
                                                <div className="appmain-ctitemsAnimeImg"></div>
                                                <div className="appmain-ctitemsTitleEpisode"></div>
                                            </div>
                                            <div className="appmain-ctitemsBlock2">
                                                <div className="appmain-ctitemsAnimeTitle"></div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="appcol-4">
                                        <div className="appmain-items">
                                            <div className="appmain-ctitemsImg"></div>
                                            <div className="appmain-ctitemsBlock1">
                                                <div className="appmain-ctitemsAnimeImg"></div>
                                                <div className="appmain-ctitemsTitleEpisode"></div>
                                            </div>
                                            <div className="appmain-ctitemsBlock2">
                                                <div className="appmain-ctitemsAnimeTitle"></div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="appcol-4">
                                        <div className="appmain-items">
                                            <div className="appmain-ctitemsImg"></div>
                                            <div className="appmain-ctitemsBlock1">
                                                <div className="appmain-ctitemsAnimeImg"></div>
                                                <div className="appmain-ctitemsTitleEpisode"></div>
                                            </div>
                                            <div className="appmain-ctitemsBlock2">
                                                <div className="appmain-ctitemsAnimeTitle"></div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="appcol-4">
                                        <div className="appmain-items">
                                            <div className="appmain-ctitemsImg"></div>
                                            <div className="appmain-ctitemsBlock1">
                                                <div className="appmain-ctitemsAnimeImg"></div>
                                                <div className="appmain-ctitemsTitleEpisode"></div>
                                            </div>
                                            <div className="appmain-ctitemsBlock2">
                                                <div className="appmain-ctitemsAnimeTitle"></div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="appcol-4">
                                        <div className="appmain-items">
                                            <div className="appmain-ctitemsImg"></div>
                                            <div className="appmain-ctitemsBlock1">
                                                <div className="appmain-ctitemsAnimeImg"></div>
                                                <div className="appmain-ctitemsTitleEpisode"></div>
                                            </div>
                                            <div className="appmain-ctitemsBlock2">
                                                <div className="appmain-ctitemsAnimeTitle"></div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            )
                        }
                        
                        
                        <div className="appmain-more">
                            <button className="more"><FontAwesomeIcon icon={faAngleDown} size="lg"/></button>
                        </div>
                        
                    </div>

                    
            
                </div>
                <div className="appcol-4">
                    <Sidebar/>
                </div>
            </div>
        
        )
    }
}

export default Desktop;