import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Updated from "../../dummy/Updated";
import Movie from "../../dummy/Movie";
import LiveAction from '../../dummy/LiveAction';

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
        };
        this.getDummy = this.getDummy.bind(this);
    }
    getDummy(){
        setTimeout(()=>{
            this.setState({
                loadingUpdated: true,
                updated: Updated,
                loadingMovie: true,
                movie: Movie,
                loadingLiveAction: true,
                liveaction: LiveAction,
            })
        }, 4000);
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
                                        this.state.updated.map((value, index)=>{

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
                    <div className="appmain-sidebar">
                        <div className="fp">
                            <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fanimeyou.net%2F&tabs&width=400&height=214&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=1978326952425638" 
                            width="400" height="214" style={{border: "none", overflow:"hidden"}} scrolling="no" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                        </div>
                        <div className="copyright">
                            © 2020, Animeyou. all rights reserved
                        </div>
                    </div>
                </div>
            </div>
        
        )
    }
}

export default Desktop;