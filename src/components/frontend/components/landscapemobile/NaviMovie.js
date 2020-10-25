import React, { Component } from "react";
import Movie from "../../dummy/Movie";

class NaviMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingMovie: false,
            movie: [],
        };
        this.getDummy = this.getDummy.bind(this);
    }
    getDummy(){
        setTimeout(()=>{
            this.setState({
                loadingMovie: true,
                movie: Movie,
                
            })
        }, 4000);
    }
    componentDidMount(){
        this.getDummy();
    }
    render() {
        return (
            <div>
            {
                this.state.loadingMovie ? (
                    <div className="appcol-12">
                        {
                            this.state.movie.map((value, index)=>{

                                return(
                                    <div key={index} className="appcol-6">
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
                    <div className="appcol-12">
                        <div className="appcol-6">
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
                        <div className="appcol-6">
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
                        <div className="appcol-6">
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
                        <div className="appcol-6">
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
                        <div className="appcol-6">
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
                        <div className="appcol-6">
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
            </div>
        )
    }
}

export default NaviMovie;
