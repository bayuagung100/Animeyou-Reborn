import React, { Component } from 'react';
import "../css/search.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import Footer from '../Footer';
import { Link } from 'react-router-dom';

import {MyContext} from "../Context";

  


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchBox: '',
        };
        this.searchBoxChange = this.searchBoxChange.bind(this);
    }
    searchBoxChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    componentDidMount(){
    }
    render() {
        const { path } = this.props.match;
        return (
            <div>
                {/* <ThemeContext.Provider value={this.state}>
                    <ThemeContext.Consumer >
                    {
                        ({searchBox, DarkMode}) => {
                            console.log("search:" + DarkMode);
                            return(
                                <div></div>
                            )
                        }
                    }
                    </ThemeContext.Consumer>
                </ThemeContext.Provider> */}
                {/* <Context> */}
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
                            <div className="search-box">
                                <input type="text" name="searchBox" value={this.state.searchBox} onChange={this.searchBoxChange} placeholder="Cari..."/>
                            </div>
                            <button className="search">
                                <FontAwesomeIcon icon={faSearch} size="lg"/>
                            </button>
                        </div>
                    </div>

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