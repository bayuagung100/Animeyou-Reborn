import React, { Component } from "react";
import "../css/watch.scss";
import { withRouter, Switch, Route, Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import QueryString from 'query-string'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faDownload, faPlay, faExpandAlt, faExpand, faVolumeUp, faPause, faVolumeMute, faCompress } from "@fortawesome/free-solid-svg-icons";
import {MyContext} from '../Context'

// import { Player } from 'video-react';
// import "../../../../node_modules/video-react/dist/video-react.css"; // import css
import $ from 'jquery';
import ReactPlayer from "react-player";
import { findDOMNode } from 'react-dom';
import screenfull from 'screenfull';


const uAPIlocal = 'http://'+window.location.hostname+':8080';

function format (seconds) {
    const date = new Date(seconds * 1000)
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = pad(date.getUTCSeconds())
    if (hh) {
      return `${hh}:${pad(mm)}:${ss}`
    }
    return `${mm}:${ss}`
}

function pad (string) {
    return ('0' + string).slice(-2)
}
  
class Watch extends Component{
    constructor(props) {
        super(props);
        const queryString = QueryString.parse(this.props.location.search);
        let query;
        if (queryString.v === undefined) {
            query = null;
        } else {
            query = queryString.v;
        }
        this.state = {
            queryV: query,
            iColapse: false,
            loading: false,
            fullscreen: false,
            Player:{
                url: 'https://www.dailymotion.com/video/x6hmtvu',
                playing: false,
                controls: false,
                volume: 1,
                muted: false,
                played: 0.5506946002344001,
                loaded: 0,
                duration: 0,
            },
        };
        this.iColapse = this.iColapse.bind(this);
        this.PlayerContainer = React.createRef();
        this.Refcontrols = React.createRef();
    }
    iColapse(){
        this.setState({iColapse: !this.state.iColapse})
    }
    handlePlayPause = () => {
        this.setState({ 
            Player:{
                ...this.state.Player,
                playing: !this.state.Player.playing,
            }
            
        })
    }
    handleToggleMutedOn = () => {
        this.setState({ 
            Player:{
                ...this.state.Player,
                muted: !this.state.Player.muted,
                volume: 0,
            }
        })
    }
    handleToggleMutedOff = () => {
        this.setState({ 
            Player:{
                ...this.state.Player,
                muted: !this.state.Player.muted,
                volume: 1,
            }
        })
    }
    handleVolumeChange = e => {
        if (parseFloat(e.target.value) === 0) {
            this.setState({ 
                Player:{
                    ...this.state.Player,
                    volume: parseFloat(e.target.value),
                    muted: true,
                }
            })
        } else {
            this.setState({ 
                Player:{
                    ...this.state.Player,
                    volume: parseFloat(e.target.value),
                    muted: false,
                }
            })
        }
        
      }
    
    
    handleSeekMouseDown = e => {
        console.log('handleSeekMouseDown', e.target)
        this.setState({ 
            Player:{
                ...this.state.Player,
                seeking: true ,
            }
        })
    }
    handleSeekChange = e => {
        console.log('handleSeekChange', e.target)
        this.setState({ 
            Player:{
                ...this.state.Player,
                played: parseFloat(e.target.value),
            }
            
        })
    }
    handleSeekMouseUp = e => {
        console.log('handleSeekMouseUp', e.target)
        this.setState({ 
            Player:{
                ...this.state.Player,
                seeking: false ,
            }
        })
        this.player.seekTo(parseFloat(e.target.value))
    }
    
    
    
    handleProgress = state => {
        console.log('onProgress', state)
        // We only want to update time slider if we are not currently seeking
        if (state.played <= this.state.Player.played) {
            this.player.seekTo(parseFloat(this.state.Player.played))
        }
        if (!this.state.Player.seeking) {
                this.setState({
                    Player:{
                        ...this.state.Player,
                        loaded: state.loaded,
                        played: state.played,
                    }
                })
        }
        
    }
    
    handleDuration = (duration) => {
        console.log('onDuration', duration)
        this.setState({ 
            Player:{
                ...this.state.Player,
                duration,
            }
            
        })
    }

    handleClickFullscreen = () => {
        this.setState({
            fullscreen: !this.state.fullscreen,
        })
        screenfull.toggle(findDOMNode(this.PlayerContainer.current))
    }
    
    
    componentDidMount(){
         setTimeout(()=>{
            this.setState({
                loading: true,
            })
        }, 3000);

        document.addEventListener("fullscreenchange", function() {
            var idleMouseTimer;
            var forceMouseHide = false;

            // $(".PlayerContainer").css('cursor', 'none');
            // $(".PlayerContainer .controls").css('display', 'none');

            $(".PlayerContainer").mousemove(function(ev) {
                    if(!forceMouseHide) {
                        $(".PlayerContainer").css('cursor', '');
                        $(".PlayerContainer .controls").css('display', 'block');
                        clearTimeout(idleMouseTimer);

                        idleMouseTimer = setTimeout(function() {
                                $(".PlayerContainer").css('cursor', 'none');
                                $(".PlayerContainer .controls").css('display', 'none');
                                forceMouseHide = true;
                                setTimeout(function() {
                                    forceMouseHide = false;
                                }, 200);
                        }, 1000);
                    }
            });

        });
    }
    ref = player => {
        this.player = player
    }
    
    render() {
        const match = this.props.match.path;
        console.log("Watch: "+match)
        return (
            <div>
                <Header/>
                <MyContext.Consumer>
                {({DarkMode}) => (
                <div className={"watch-container approw "+(DarkMode ? "dark-mode":"")}>
                    {
                        this.state.queryV===null ? (<h3>Notfound</h3>):(
                            <div className="appmain">
                            
                                <div className="appcol-8">
                                    
                                    {/* <Player
                                        playsInline
                                        src="https://www.blogger.com/video.g?token=AD6v5dwTMSW941QBbt8mQkkn45DGTRAWwBIUpoOcx5gUV5jxOI0Ktp0lxgwq4oazAlhSYTEXSnD1U6lgsSZikkRqxFbBcJKxCGoYMavwUVMLBlafPcQgPNwMXo6yPBGLPwfePyi_wwKC"
                                        /> */}
                                        {/* <ReactPlayer
                                                url="https://www.blogger.com/video.g?token=AD6v5dwTMSW941QBbt8mQkkn45DGTRAWwBIUpoOcx5gUV5jxOI0Ktp0lxgwq4oazAlhSYTEXSnD1U6lgsSZikkRqxFbBcJKxCGoYMavwUVMLBlafPcQgPNwMXo6yPBGLPwfePyi_wwKC"
                                                controls
                                            /> */}
                                        
                                        {
                                            this.state.loading ? (
                                                <div className="appmain-content">
                                                    <div className="PlayerContainer" ref={this.PlayerContainer}>
                                                        <ReactPlayer
                                                            ref={this.ref}
                                                            className='responsive-iframe'
                                                            width='100%'
                                                            height='100%'
                                                            url={this.state.Player.url}
                                                            playing={this.state.Player.playing}
                                                            controls={this.state.Player.controls}
                                                            volume={this.state.Player.volume}
                                                            muted={this.state.Player.muted}
                                                            onError={e => console.log('onError', e)}
                                                            onProgress={this.handleProgress}
                                                            onDuration={this.handleDuration}
                                                        />
                                                        <div className='controls' ref={this.Refcontrols}>
                                                            <div className='play' onClick={this.handlePlayPause}>
                                                                {
                                                                    this.state.Player.playing ? (
                                                                        <FontAwesomeIcon icon={faPause} size='lg' className='iconPause' title='Jeda'/>
                                                                    ):(
                                                                        <FontAwesomeIcon icon={faPlay} size='lg' className='iconPlay' title='Mulai' />
                                                                    )
                                                                }
                                                                
                                                            </div>
                                                            <div className='time'>
                                                                {format(this.state.Player.duration * this.state.Player.played)} / {format(this.state.Player.duration)}
                                                            </div>
                                                            <div className='volume' >
                                                                {
                                                                    this.state.Player.muted ? (
                                                                        <FontAwesomeIcon icon={faVolumeMute} size='lg' title='Bunyikan' onClick={this.handleToggleMutedOff}/>
                                                                    ):(
                                                                        <FontAwesomeIcon icon={faVolumeUp} size='lg' title='Bisukan' onClick={this.handleToggleMutedOn}/>
                                                                    )
                                                                }
                                                                <input className='tingkat' type="range" min="0" max="1" step='any' value={this.state.Player.volume} onChange={this.handleVolumeChange}/>
                                                            </div>
                                                            <div className='fullscreen' >
                                                                {
                                                                    this.state.fullscreen ? (
                                                                        <FontAwesomeIcon icon={faCompress} size='lg' title='Keluar dari Layar Penuh' onClick={this.handleClickFullscreen}/>
                                                                    ):(
                                                                        <FontAwesomeIcon icon={faExpand} size='lg' title='Layar Penuh' onClick={this.handleClickFullscreen}/>
                                                                    )
                                                                }
                                                                
                                                            </div>
                                                            <div className='progress' title='seek'>
                                                                <input
                                                                    type='range' className='played-seek' min={0} max={0.999999} step='any'
                                                                    value={this.state.Player.played}
                                                                    onMouseDown={this.handleSeekMouseDown}
                                                                    onChange={this.handleSeekChange}
                                                                    onMouseUp={this.handleSeekMouseUp}
                                                                />
                                                                <progress className='played' max={1} value={this.state.Player.played} 
                                                                />
                                                                <progress className='loaded' max={1} value={this.state.Player.loaded} />
                                                            </div>
                                                        </div>
                                                        
                                                        {/* <iframe className='responsive-iframe' src='https://www.blogger.com/video.g?token=AD6v5dwTMSW941QBbt8mQkkn45DGTRAWwBIUpoOcx5gUV5jxOI0Ktp0lxgwq4oazAlhSYTEXSnD1U6lgsSZikkRqxFbBcJKxCGoYMavwUVMLBlafPcQgPNwMXo6yPBGLPwfePyi_wwKC' allowFullScreen></iframe> */}
                                                    </div>
                                                    {/* <div className="player">
                                                        <ReactPlayer
                                                            className='player__video viewer'
                                                            width='100%'
                                                            height='100%'

                                                            url="https://www.dailymotion.com/video/x6hmtvu"
                                                            // controls
                                                        />
                                                        <div className="player__controls">
                                                            <div className="progress">
                                                                <div className="progress__filled" style={{'flexBasis': '0%'}}></div>
                                                            </div>
                                                            <button className="player__button toggle" title="Toggle Play">
                                                               play 
                                                            </button>
                                                        </div>
                                                    </div> */}
                                                    <div className="TitleWatch">
                                                        Watch : {this.state.queryV}
                                                    </div>
                                                    <div className="BlockWatch">
                                                        <div className="ViewWatch">
                                                            10000 views
                                                        </div>
                                                        <div className="DotsWatch">
                                                            .
                                                        </div>
                                                        <div className="UploadedWatch">
                                                            1 days ago
                                                        </div>
                                                    </div>
                                                    <div className="AnimeWatch">
                                                        <div className='AnimeImg'>
                                                            <img src={uAPIlocal+'/images/ylangylang.png'} alt='img' />
                                                        </div>
                                                        <div className="AnimeTitle">
                                                            <div className='text'>
                                                            {this.state.queryV} 
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="ContentWatch">
                                                        <div className='ContentImg'>
                                                            <img src={uAPIlocal+'/images/ylangylang.png'} alt='img' />
                                                        </div>
                                                        <div className='ContentKeywords'>
                                                            <h3>Download Anime 3D Kanojo: Real Girl Episode 02 Subtitle Indonesia</h3>
                                                            <br/>
                                                            <h4>Streaming Anime 3D Kanojo: Real Girl Episode 02 Subtitle Indonesia</h4>
                                                            <br/>
                                                            <h5><i>Like &amp; follow media sosial resmi kami untuk mendapatkan informasi terbaru Anime Subtitle Indonesia</i></h5>
                                                            <h4>
                                                                <button className="text-primary" onClick={(event) => window.open("https://www.facebook.com/animeyou.net/",'_blank')}>
                                                                    <b>FACEBOOK</b>
                                                                </button> | <button className="text-danger" onClick={(event) => window.open("https://www.instagram.com/animeyou_net/",'_blank')} >
                                                                    <b>INSTAGRAM</b>
                                                                </button>
                                                            </h4>
                                                        </div>
                                                        <div className='ContentDownload'>
                                                            <div className='head'>
                                                                Link Download: 
                                                            </div>
                                                            <div className='videoDownload'>
                                                                <div>Video Mkv</div>
                                                                <ul>
                                                                    <li className='text-center'>
                                                                        <div className='video240p'>240p</div>
                                                                        <div className='linkDownload'>
                                                                            <div className='gd coret'>Google Drive</div>
                                                                            <Link to='#' className='gd'>Google Drive</Link>
                                                                            <Link to='#' className='gd'>Google Drive</Link>
                                                                        </div>
                                                                    </li>
                                                                    <li className='text-center'>
                                                                        <div className='video360p'>360p</div>
                                                                        <div className='linkDownload'>
                                                                            <div className='gd coret'>Google Drive</div>
                                                                            <Link to='#' className='gd'>Google Drive</Link>
                                                                            <Link to='#' className='gd'>Google Drive</Link>
                                                                        </div>
                                                                    </li>
                                                                    <li className='text-center'>
                                                                        <div className='video480p'>480p</div>
                                                                        <div className='linkDownload'>
                                                                            <div className='gd coret'>Google Drive</div>
                                                                            <Link to='#' className='gd'>Google Drive</Link>
                                                                            <Link to='#' className='gd'>Google Drive</Link>
                                                                        </div>
                                                                    </li>
                                                                    <li className='text-center'>
                                                                        <div className='video720p'>720p</div>
                                                                        <div className='linkDownload'>
                                                                            <div className='gd coret'>Google Drive</div>
                                                                            <Link to='#' className='gd'>Google Drive</Link>
                                                                            <Link to='#' className='gd'>Google Drive</Link>
                                                                        </div>
                                                                    </li>
                                                                    <li className='text-center'>
                                                                        <div className='video1080p'>1080p</div>
                                                                        <div className='linkDownload'>
                                                                            <div className='gd coret'>Google Drive</div>
                                                                            <Link to='#' className='gd'>Google Drive</Link>
                                                                            <Link to='#' className='gd'>Google Drive</Link>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className='videoDownload'>
                                                                <div>Video Mp4</div>
                                                                <ul>
                                                                    <li className='text-center'>
                                                                        <div className='video240p'>240p</div>
                                                                        <div className='linkDownload'>
                                                                            <div className='gd coret'>Google Drive</div>
                                                                            <Link to='#' className='gd'>Google Drive</Link>
                                                                            <Link to='#' className='gd'>Google Drive</Link>
                                                                        </div>
                                                                    </li>
                                                                    <li className='text-center'>
                                                                        <div className='video360p'>360p</div>
                                                                        <div className='linkDownload'>
                                                                            <div className='gd coret'>Google Drive</div>
                                                                            <Link to='#' className='gd'>Google Drive</Link>
                                                                            <Link to='#' className='gd'>Google Drive</Link>
                                                                        </div>
                                                                    </li>
                                                                    <li className='text-center'>
                                                                        <div className='video480p'>480p</div>
                                                                        <div className='linkDownload'>
                                                                            <div className='gd coret'>Google Drive</div>
                                                                            <Link to='#' className='gd'>Google Drive</Link>
                                                                            <Link to='#' className='gd'>Google Drive</Link>
                                                                        </div>
                                                                    </li>
                                                                    <li className='text-center'>
                                                                        <div className='video720p'>720p</div>
                                                                        <div className='linkDownload'>
                                                                            <div className='gd coret'>Google Drive</div>
                                                                            <Link to='#' className='gd'>Google Drive</Link>
                                                                            <Link to='#' className='gd'>Google Drive</Link>
                                                                        </div>
                                                                    </li>
                                                                    <li className='text-center'>
                                                                        <div className='video1080p'>1080p</div>
                                                                        <div className='linkDownload'>
                                                                            <div className='gd coret'>Google Drive</div>
                                                                            <Link to='#' className='gd'>Google Drive</Link>
                                                                            <Link to='#' className='gd'>Google Drive</Link>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ):(
                                                <div className="appmain-content">
                                                    <div className="ctPlayerWatch"></div>
                                                    <div className="ctTitleWatch"></div>
                                                </div>
                                            )
                                        }
                                        

                                        

                                    
                                </div>
                                <div className="appcol-4">
                                    <div className="appmain-playlist approw">
                                        <div className="playlistTitle">
                                            <div className="title">
                                                Playlist - {this.state.queryV} 
                                            </div>

                                            <button className="iColapse" onClick={this.iColapse}>
                                                {
                                                    this.state.iColapse ? (
                                                        <FontAwesomeIcon icon={faAngleDown} size="lg" className="icon"/>
                                                    ):(
                                                        <FontAwesomeIcon icon={faAngleUp} size="lg" className="icon"/>
                                                    )
                                                }
                                            
                                            </button>
                                        </div>
                                        {
                                            this.state.iColapse ? null:(
                                            <div className="playlistItems">
                                                <div className="ctItems"></div>

                                                <div className="ctItems"></div>
                                                <div className="ctItems"></div>
                                                <div className="ctItems"></div>
                                                <div className="ctItems"></div>
                                                
                                            </div>
                                            )
                                        }
                                        
                                        
                                    </div>
                                </div>
                                
                            </div>
                        )
                    }
                    
                </div>
                
                )}
                </MyContext.Consumer>
                <Footer/>
            </div>
        )
    }
}

export default Watch;