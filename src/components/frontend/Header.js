import React, { Component } from 'react';
import "./css/header.scss";
import Logo from "./icon/logo.png";
import { Redirect, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faEllipsisV, faList, faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';

import {ThemeContext} from './theme-context';

import {MyContext} from "./Context";

//contoh pakai context di nested component
// function ThemeTogglerButton() {
//     return (
//       <ThemeContext.Consumer>
//         {
//             ({theme, toggleTheme, DarkMode, gelapClick, terangClick}) => {
//                 return(
//                     <div>
//                         <div className={DarkMode===true ? 'mode-gelap':null}>isi</div>
//                         <button
//                             onClick={toggleTheme}
//                             style={{backgroundColor: theme.background}}>
//                             Toggle Theme
//                         </button>
//                         <button
//                             onClick={gelapClick}>
//                             Gelap
//                         </button>
//                         <button
//                             onClick={terangClick}>
//                             Terang
//                         </button>
//                     </div>
//                 )
//             }
//         }
//       </ThemeContext.Consumer>
//     );
// }

class Header extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            searchBox: '',
            loading: false,
            goSearch: false,
            goCollection: false,
            menuSetting: false,
            menuTampilan: false,
        };
        this.searchBoxChange = this.searchBoxChange.bind(this);
        this.SearchClick = this.SearchClick.bind(this);
        this.CollectionClick = this.CollectionClick.bind(this);
        this.SettingClick = this.SettingClick.bind(this);
        this.HideSetting = this.HideSetting.bind(this);
        
        this.inTampilanClick = this.inTampilanClick.bind(this);
        this.TampilanClick = this.TampilanClick.bind(this);
        this.gelapClick = this.gelapClick.bind(this);
        this.terangClick = this.terangClick.bind(this);
    }
    TampilanClick(){
        this.setState({
            menuTampilan: !this.state.menuTampilan,
            menuSetting: true,
        });
    }
    inTampilanClick(){
        this.setState({
            menuSetting: false,
            menuTampilan: !this.state.menuTampilan
        });
    }
    gelapClick(){
        this.setState({
            menuTampilan: false,
            menuSetting: false,
        });
    }
    terangClick(){
        this.setState({
            menuTampilan: false,
            menuSetting: false,
        });
    }

    SearchClick(){
        this.setState({goSearch: true});
    }

    SettingClick(){
        this.setState({menuSetting: !this.state.menuSetting});
    }
    HideSetting(){
        this.setState({
            menuSetting: false,
            menuTampilan: false
        });
    }

    CollectionClick(){
        this.setState({goCollection: true});
    }

    searchBoxChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                loading: true,
            })
        }, 3000);

    }
    

    render() {
        if (this.state.goSearch) {
            return (<Redirect push to="/search"/>)
        } else if (this.state.goCollection) {
            return (<Redirect push to="/collection"/>)
        }
        return (
            
            // <ThemeContext.Consumer>
            <MyContext.Consumer>
            {
                ({DarkMode, gelapClick, terangClick}) => {
                return(
                <div>
                    <div className={"nav-container "+(DarkMode ? "dark-mode":"")}>
                            {
                                this.state.loading ? (
                                <div className="nav-brand" >
                                    <Link to="/">
                                        <img className="logo" src={Logo} alt="logo"/>
                                        <div className="brand">Animeyou</div>
                                    </Link>
                                </div>
                                ):(
                                <div className="nav-brand" >
                                    <div className="ctlogo"></div>
                                    <div className="ctbrand"></div>
                                </div>
                                )
                            }
                        <div className="nav-search">
                            <div className="search-box">
                                <input type="text" name="searchBox" defaultValue="" placeholder="Cari..." onClick={this.SearchClick}/>
                            </div>
                            {/* <button className="search">
                                <FontAwesomeIcon icon={faSearch} size="lg"/>
                            </button> */}
                        </div>

                        {
                                this.state.loading ? (
                                <div className="nav-menu">
                                    <button className="login">
                                        <FontAwesomeIcon icon={faUserCircle} size="lg"/> Sign In
                                    </button>
                                    <button className="setting" onClick={this.SettingClick}>
                                        <FontAwesomeIcon icon={faEllipsisV} size="lg"/>
                                        <span className="settingtooltip tooltip-left">Setting</span>
                                    </button>
                                    <button className="collection" onClick={this.CollectionClick}>
                                        <FontAwesomeIcon icon={faList} size="lg"/>
                                        <span className="collectiontooltip tooltip-left">Collection</span>
                                    </button>
                                </div>
                                
                                ):(
                                <div className="nav-menu">
                                    <div className="ctlogin"></div>
                                    <div className="ctsetting"></div>
                                    <div className="ctcollection"></div>
                                </div>
                                )
                        }
                        
                        
                    </div>

                    {
                        this.state.menuSetting ? (
                            <div>
                                <div onClick={this.HideSetting} className="hide-menu-setting"></div>
                                <div className={"menu-setting "+(DarkMode ? "dark-mode":"")}>
                                    <div className="menu" onClick={this.inTampilanClick}>
                                        <div className="text-tampilan">Tampilan: {DarkMode ? "Gelap":"Terang"}</div>
                                    </div>
                                </div>
                            </div>
                        ):null
                    }
                    {
                        this.state.menuTampilan ? (
                            <div>
                                <div onClick={this.HideSetting} className="hide-menu-tampilan"></div>
                                <div className={"menu-tampilan "+(DarkMode ? "dark-mode":"")}>
                                    <div className="menu-head">
                                        <FontAwesomeIcon icon={faArrowLeft} size="lg" onClick={this.TampilanClick} className="icon"/> Tampilan
                                    </div>
                                    <div className="menu" onClick={() => {gelapClick(); this.gelapClick()}}>
                                        <div className="text-gelap">Gelap {DarkMode===true ? (<FontAwesomeIcon icon={faCheck}/>):null}</div>
                                    </div>
                                    <div className="menu" onClick={()=> {terangClick();this.terangClick()}}>
                                        <div className="text-terang">Terang {DarkMode===false ? (<FontAwesomeIcon icon={faCheck}/>):null}</div>
                                    </div>
                                </div>
                            </div>
                        ):null
                    }
                </div>
                )
                }
            }
            {/* </ThemeContext.Consumer> */}
            </MyContext.Consumer>
        );
    }
}


export default Header;
