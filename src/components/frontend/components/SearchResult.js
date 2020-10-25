import React, { Component } from 'react';

  


class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        
    }
    
    componentDidMount(){
    }
    render() {
        return (
            <div className={"search-container-result approw "+(this.props.DarkMode ? "dark-mode":"") }>
                <div className="appmain">
                    <div className="appcol-12">
                        <div className="appmain-content">
                            <div className="result-for">Hasil pencarian: {this.props.pencarian}</div> 
                            <div className="result">
                                <div className="approw">
                                    <div className={"appcol-"+this.props.col}>
                                        <div className="appmain-items">
                                            <div className="appcol-6">
                                                <div className="appmain-ctitemsImg"></div>
                                            </div>
                                            <div className="appcol-6">
                                                <div className="appmain-ctitemsBlockTitle">
                                                    <div className="appmain-ctitemsTitle"></div>
                                                </div>
                                                <div className="appmain-ctitemsBlockGenre">
                                                    <div className="appmain-ctitemsGenreTitle"></div>
                                                    <div className="appmain-ctitemsGenreTitle"></div>
                                                    <div className="appmain-ctitemsGenreTitle"></div>
                                                </div>

                                                <div className="appmain-ctitemsBlockDesc">
                                                    <div className="appmain-ctitemsDesc"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"appcol-"+this.props.col}>
                                        <div className="appmain-items">
                                            <div className="appcol-6">
                                                <div className="appmain-ctitemsImg"></div>
                                            </div>
                                            <div className="appcol-6">
                                                <div className="appmain-ctitemsBlockTitle">
                                                    <div className="appmain-ctitemsTitle"></div>
                                                </div>
                                                <div className="appmain-ctitemsBlockGenre">
                                                    <div className="appmain-ctitemsGenreTitle"></div>
                                                    <div className="appmain-ctitemsGenreTitle"></div>
                                                    <div className="appmain-ctitemsGenreTitle"></div>
                                                </div>

                                                <div className="appmain-ctitemsBlockDesc">
                                                    <div className="appmain-ctitemsDesc"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"appcol-"+this.props.col}>
                                        <div className="appmain-items">
                                            <div className="appcol-6">
                                                <div className="appmain-ctitemsImg"></div>
                                            </div>
                                            <div className="appcol-6">
                                                <div className="appmain-ctitemsBlockTitle">
                                                    <div className="appmain-ctitemsTitle"></div>
                                                </div>
                                                <div className="appmain-ctitemsBlockGenre">
                                                    <div className="appmain-ctitemsGenreTitle"></div>
                                                    <div className="appmain-ctitemsGenreTitle"></div>
                                                    <div className="appmain-ctitemsGenreTitle"></div>
                                                </div>

                                                <div className="appmain-ctitemsBlockDesc">
                                                    <div className="appmain-ctitemsDesc"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"appcol-"+this.props.col}>
                                        <div className="appmain-items">
                                            <div className="appcol-6">
                                                <div className="appmain-ctitemsImg"></div>
                                            </div>
                                            <div className="appcol-6">
                                                <div className="appmain-ctitemsBlockTitle">
                                                    <div className="appmain-ctitemsTitle"></div>
                                                </div>
                                                <div className="appmain-ctitemsBlockGenre">
                                                    <div className="appmain-ctitemsGenreTitle"></div>
                                                    <div className="appmain-ctitemsGenreTitle"></div>
                                                    <div className="appmain-ctitemsGenreTitle"></div>
                                                </div>

                                                <div className="appmain-ctitemsBlockDesc">
                                                    <div className="appmain-ctitemsDesc"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"appcol-"+this.props.col}>
                                        <div className="appmain-items">
                                            <div className="appcol-6">
                                                <div className="appmain-ctitemsImg"></div>
                                            </div>
                                            <div className="appcol-6">
                                                <div className="appmain-ctitemsBlockTitle">
                                                    <div className="appmain-ctitemsTitle"></div>
                                                </div>
                                                <div className="appmain-ctitemsBlockGenre">
                                                    <div className="appmain-ctitemsGenreTitle"></div>
                                                    <div className="appmain-ctitemsGenreTitle"></div>
                                                    <div className="appmain-ctitemsGenreTitle"></div>
                                                </div>

                                                <div className="appmain-ctitemsBlockDesc">
                                                    <div className="appmain-ctitemsDesc"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"appcol-"+this.props.col}>
                                        <div className="appmain-items">
                                            <div className="appcol-6">
                                                <div className="appmain-ctitemsImg"></div>
                                            </div>
                                            <div className="appcol-6">
                                                <div className="appmain-ctitemsBlockTitle">
                                                    <div className="appmain-ctitemsTitle"></div>
                                                </div>
                                                <div className="appmain-ctitemsBlockGenre">
                                                    <div className="appmain-ctitemsGenreTitle"></div>
                                                    <div className="appmain-ctitemsGenreTitle"></div>
                                                    <div className="appmain-ctitemsGenreTitle"></div>
                                                </div>

                                                <div className="appmain-ctitemsBlockDesc">
                                                    <div className="appmain-ctitemsDesc"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>   
        )
    }
}
// Search.contextType = ThemeContext;
export default SearchResult;