import React, { Component, Fragment } from 'react';
import "../css/search.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import Media from 'react-media';
import SearchResult from './SearchResult';
import Footer from '../Footer';
import { Link } from 'react-router-dom';

import {MyContext} from "../Context";
import Sidebar from '../Sidebar';

  


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchBox: '',
            value: "",
        };
        this.searchBoxChange = this.searchBoxChange.bind(this);
        this.searchSubmit = this.searchSubmit.bind(this);
    }
    searchBoxChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    searchSubmit(e){
        e.preventDefault();
        this.setState({
            value: this.state.searchBox
        })
    }
    componentDidMount(){
    }
    render() {
        const { path } = this.props.match;
        return (
            <div>
                <MyContext.Consumer>
                {({DarkMode}) => (
                <div>
                    <div className={"search-container "+(DarkMode ? "dark-mode":"")}>
                        {/* <Link to="/"> */}
                        <button className="back-search" onClick={()=>this.props.history.goBack()}>
                            <FontAwesomeIcon icon={faArrowLeft} size="lg"/>                
                        </button>
                        {/* </Link> */}
                        <div className="nav-search">
                        <form onSubmit={this.searchSubmit}>
                            <div className="search-box">
                                <input type="text" name="searchBox" value={this.state.searchBox} onChange={this.searchBoxChange} placeholder="Cari..."/>
                            </div>
                            <button type="submit" className="search">
                                <FontAwesomeIcon icon={faSearch} size="lg"/>
                            </button>
                        </form>
                        </div>
                    </div>

                    {
                        this.state.value ? (
                        <Media queries={{
                            desktop: "(min-width: 1025px)",
                            tablet: "(min-width: 768px) and (max-width: 1024px)",
                            landscapeMobile: "(min-width: 481px) and (max-width: 767px)",
                            portraitMobile: "(min-width: 320px) and (max-width: 480px)",
                        }}>
                            {matches => (
                                <Fragment>
                                    {matches.desktop && <SearchResult DarkMode={DarkMode} col='6' pencarian={this.state.value}/>}
                                    {matches.tablet && <SearchResult DarkMode={DarkMode} col='6' pencarian={this.state.value}/>}
                                    {matches.landscapeMobile && <SearchResult DarkMode={DarkMode} col='12' pencarian={this.state.value}/>}
                                    {matches.portraitMobile && <SearchResult DarkMode={DarkMode} col='12' pencarian={this.state.value}/>}
                                </Fragment>
                            )}
                        </Media>
                        ):null
                    }
                    
                    <Footer path={path}/>
                </div>
                )}
                </MyContext.Consumer>
                {/* </Context> */}
            </div>
        )
    }
}
// Search.contextType = ThemeContext;
export default Search;