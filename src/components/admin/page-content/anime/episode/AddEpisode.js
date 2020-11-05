import React, { Component } from "react";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import Select from 'react-select';
import { FixedSizeList as List } from "react-window";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faArrowLeft, faSearch, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';

const uAPIlocal = 'http://'+window.location.hostname+':8080';

function BtnBack() {
    let history = useHistory();
    return (
        <button type="button"  className="btn btn-warning" onClick={() => history.goBack()}>
            <FontAwesomeIcon icon={faArrowLeft}/> Batal
        </button>
    );
}

function convert_seo(url) {
    // make the url lowercase         
    var encodedUrl = url.toString().toLowerCase(); 

    // replace & with and           
    encodedUrl = encodedUrl.split(/\&+/).join("-and-");

    // remove invalid characters 
    encodedUrl = encodedUrl.split(/[^a-z0-9]/).join("-");       

    // remove duplicates 
    encodedUrl = encodedUrl.split(/-+/).join("-");

    // trim leading & trailing characters 
    encodedUrl = encodedUrl.trim('-'); 
    
	return encodedUrl;
}

const options = [];
for (let i = 0; i < 10000; i = i + 1) {
  options.push({ value: i, label: i });
}

const height = 35;

class MenuList extends Component {
  render() {
    const { options, children, maxHeight, getValue } = this.props;
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * height;

    return (
      <List
        height={maxHeight}
        itemCount={children.length}
        itemSize={height}
        initialScrollOffset={initialOffset}
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    );
  }
}

class AddEpisode extends Component {
    constructor(props){
        super(props);

        this.state = {
            redirect : false,
            gambar: {
                icon: true,
                preview: '',
                raw: '',
            },
            dataEpisode:{
                animeOptions:[],
                selectedAnime: '',
                selectedEpisode: '',

                animeId: '',
                judul: '',
                url: '',
                episode: '',

                blogger: '',

                mkv_240p: '',
                mkv_360p: '',
                mkv_480p: '',
                mkv_720p: '',
                mkv_1080p: '',
                mp4_240p: '',
                mp4_360p: '',
                mp4_480p: '',
                mp4_720p: '',
                mp4_1080p: '',
            }
        }
        
        this.addEpisodeChange = this.addEpisodeChange.bind(this);

        this.gambarInput = React.createRef();
        this.gambarReset = this.gambarReset.bind(this);
        this.gambarChange = this.gambarChange.bind(this);
        this.gambarAdd = this.gambarAdd.bind(this);
        this.gambarDelete = this.gambarDelete.bind(this);

        this.addEpisodeSubmit = this.addEpisodeSubmit.bind(this);
        
    }
    addEpisodeChange(e) {
        let newaddEpisode = { ...this.state.dataEpisode };
        newaddEpisode[e.target.name] = e.target.value;
        this.setState({
            dataEpisode: newaddEpisode
        },()=>console.log(this.state.dataEpisode));
        
    }
    animeChange = selected => {
        let cek = this.state.dataEpisode.selectedEpisode ? this.state.dataEpisode.selectedEpisode.value:'';
        if (cek === "") {
            var judul = selected.value+' Subtitle Indonesia';
            var url = convert_seo(judul);
        } else {
            var judul = selected.value+' Episode '+cek+' Subtitle Indonesia';
            var url = convert_seo(judul);
        }
        this.setState({ 
            dataEpisode:{
                ...this.state.dataEpisode,
                selectedAnime: selected,
                animeId: selected.animeId,
                judul: judul,
                url: url,
            }
        },()=>console.log(this.state.dataEpisode));
    };
    episodeChange = selected => {
        let cek = this.state.dataEpisode.selectedAnime ? this.state.dataEpisode.selectedAnime.value:'';
        if (cek === "") {
            var judul = 'Episode '+selected.value+' Subtitle Indonesia';
            var cek2 = convert_seo(judul);
        } else {
            var judul = cek+' Episode '+selected.value+' Subtitle Indonesia';
            var cek2 = convert_seo(judul);
        }
        this.setState({ 
            dataEpisode:{
                ...this.state.dataEpisode,
                selectedEpisode: selected,
                judul: judul,
                url: cek2,
                episode: selected.value,
            }
        },()=>console.log(this.state.dataEpisode));
    };

    gambarReset(e){
        e.target.value=''
    }
    gambarChange(e){
        if (e.target.files && e.target.files[0]) {
          let img = e.target.files[0];
          this.setState({
            gambar: {
                icon: false,
                //show imagenya
                preview: URL.createObjectURL(img),

                //show data imagenya
                raw: img,
            }
          });
        }
    };
    gambarAdd(e){
        this.gambarInput.current.click();
    }
    gambarDelete(e){
        this.setState({
            gambar: {
                icon: true,
                preview: '',
                raw: '',
            }
        });
    }

    addEpisodeSubmit(e){
        e.preventDefault();
        // console.log(this.state.dataEpisode)
        const formData = new FormData();
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        formData.append('animeId',this.state.dataEpisode.animeId);
        formData.append('judul',this.state.dataEpisode.judul);
        formData.append('url',this.state.dataEpisode.url);
        formData.append('episode',this.state.dataEpisode.episode);
        formData.append('gambar',this.state.gambar.raw);
        formData.append('blogger',this.state.dataEpisode.blogger);
        formData.append('mkv_240p',this.state.dataEpisode.mkv_240p);
        formData.append('mkv_360p',this.state.dataEpisode.mkv_360p);
        formData.append('mkv_480p',this.state.dataEpisode.mkv_480p);
        formData.append('mkv_720p',this.state.dataEpisode.mkv_720p);
        formData.append('mkv_1080p',this.state.dataEpisode.mkv_1080p);
        formData.append('mp4_240p',this.state.dataEpisode.mp4_240p);
        formData.append('mp4_360p',this.state.dataEpisode.mp4_360p);
        formData.append('mp4_480p',this.state.dataEpisode.mp4_480p);
        formData.append('mp4_720p',this.state.dataEpisode.mp4_720p);
        formData.append('mp4_1080p',this.state.dataEpisode.mp4_1080p);
        formData.append('views',0);

        // var today = new Date();
        // var curTime = today.getFullYear()+'-'+today.getMonth()+1+'-'+today.getDate()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
        // var curTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        var date = new Date();
            date = date.getFullYear() + '-' +
                ('00' + (date.getMonth()+1)).slice(-2) + '-' +
                ('00' + date.getDate()).slice(-2) + ' ' + 
                ('00' + date.getHours()).slice(-2) + ':' + 
                ('00' + date.getMinutes()).slice(-2) + ':' + 
                ('00' + date.getSeconds()).slice(-2);
        formData.append('published_time',date);
        formData.append('modified_time',date);

        // for (var pair of formData.entries()) {
        //     console.log(pair[0]+ ': ' + pair[1]); 
        // }

        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!',
            allowOutsideClick: false,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                if (this.state.dataEpisode.animeId === "") {
                    Swal.fire({
                        title: 'Oops!',
                        text: 'Anime Belum Dipilih!',
                        icon: 'error',
                        allowOutsideClick: false
                    })
                } else if (this.state.dataEpisode.episode === "") {
                    Swal.fire({
                        title: 'Oops!',
                        text: 'Episode Belum Dipilih!',
                        icon: 'error',
                        allowOutsideClick: false
                    })
                } else if (this.state.gambar.icon === true) {
                    Swal.fire({
                        title: 'Oops!',
                        text: 'Gambar Tidak Ada!',
                        icon: 'error',
                        allowOutsideClick: false
                    })
                } else {
                    return axios.post(uAPIlocal+'/api/v1/animeepisodelist',formData,config)
                    .then(function(response) {
                        //status 406 = data sudah ada (not acceptable)
                        if (response.data.status === 406 ) {
                            Swal.fire({
                                title: 'Oops...!',
                                html: response.data.message,
                                icon: 'error',
                                allowOutsideClick: false,
                            })
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        Swal.fire('Oops...', 'Something went wrong!', 'error');
                    });
                }
            }
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Success tambah episode',
                    icon: 'success',
                    allowOutsideClick: false,
                }).then(() => this.setState({ redirect: true }))
            }
        })
    }
    componentDidMount(){
        axios.get(uAPIlocal+'/api/v1/select/anime')
        .then(function(response) {
            return response.data.results;
        })
        .then(response => {
            this.setState({
                dataEpisode:{
                    ...this.state.dataEpisode,
                    animeOptions: response
                }
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    
    render() {
        if (this.state.redirect) {
            return (<Redirect to="/admin/anime-episode" />)
        }
        return (
            <div>
                <section className="content" style={{paddingTop:"20px"}}>
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Tambah Episode Anime</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={e => this.addEpisodeSubmit(e)} className="form-horizontal" style={{padding:"10px"}}>
                                    <div className="row">
                                        <div className="form-group col-sm-6">
                                            <label>Anime</label>
                                            <Select
                                                placeholder='Pilih Anime'
                                                value={this.state.dataEpisode.selectedAnime}
                                                onChange={this.animeChange}
                                                options={this.state.dataEpisode.animeOptions}
                                            />
                                        </div>
                                        <div className="form-group col-sm-6">
                                            <label>Episode</label>
                                            <Select components={{ MenuList }} options={options} value={this.state.dataEpisode.selectedEpisode}
                                                onChange={this.episodeChange} />
                                            {/* <Select
                                                placeholder='Pilih Episode'
                                                value={this.state.dataEpisode.selectedEpisode}
                                                onChange={this.episodeChange}
                                                options={episodeOptions}
                                            /> */}
                                        </div>
                                    </div>
                                    
                                    <div className="form-group">
                                        <label>Judul</label>
                                        <input type="text" className="form-control" name="judul" value={this.state.dataEpisode.judul}  onChange={this.addEpisodeChange} placeholder="Judul" required/>
                                    </div>
                                    
                                    <div className="form-group">
                                        <label>Slug (Url)</label>
                                        <input type="text" className="form-control" name="url" value={this.state.dataEpisode.url}  onChange={this.addEpisodeChange} placeholder="Url" required/>
                                    </div>

                                    <div className="form-group">
                                        <label>Gambar</label>
                                        <div className='col-sm-2' style={{border:'2px dashed red'}}>
                                            <div style={{width: '100%',height: 'auto',}}>
                                            {
                                                this.state.gambar.icon ? (
                                                    <FontAwesomeIcon icon={faPlus} onClick={this.gambarAdd} color='red' style={{
                                                        cursor:'pointer', border:'2px dashed red', borderRadius:'100%', padding:'4px', width:'29px', height:'29px',
                                                        display: 'inline-block',
                                                        position: 'relative',
                                                        top: '2px', left:'20px',
                                                        margin: '40px',
                                                    }} />
                                                ):(
                                                    <div style={{position: 'relative',display: 'inline-block',padding: '5px',}}>
                                                        <img src={this.state.gambar.preview} alt={this.state.gambar.raw.name} style={{width: '100%',height: 'auto',}}/>
                                                        <div style={{position:'relative',top:'4px'}}>
                                                            <FontAwesomeIcon icon={faTrash} onClick={this.gambarDelete} color='red' style={{
                                                                cursor:'pointer', border:'2px dashed red', borderRadius:'100%', padding:'4px', width:'29px', height:'29px',
                                                                position: 'relative', 
                                                                right: '-40%', 
                                                            }} />
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            </div>
                                        </div>
                                        <input id="gambar" type="file" ref={this.gambarInput} style={{ display: "none" }} name="gambar" onChange={this.gambarChange} onClick={this.gambarReset}/>
                                    </div>
                                    <hr/>
                                    <h4>Video Streaming</h4>

                                    <div className="form-group">
                                        <label>Blogger</label>
                                        <textarea name="blogger" className="form-control" value={this.state.dataEpisode.blogger} onChange={this.addEpisodeChange} placeholder="video dari blogger" required/>
                                    </div>

                                    <hr/>
                                    <h4>Link Download</h4>
                                    <div className="row">
                                        <div className="form-group col-sm-6">
                                            <label>Mkv 240p</label>
                                            <textarea name="mkv_240p" className="form-control" value={this.state.dataEpisode.mkv_240p} onChange={this.addEpisodeChange} placeholder="link"/>
                                            <label>Mkv 360p</label>
                                            <textarea name="mkv_360p" className="form-control" value={this.state.dataEpisode.mkv_360p} onChange={this.addEpisodeChange} placeholder="link"/>
                                            <label>Mkv 480p</label>
                                            <textarea name="mkv_480p" className="form-control" value={this.state.dataEpisode.mkv_480p} onChange={this.addEpisodeChange} placeholder="link"/>
                                            <label>Mkv 720p</label>
                                            <textarea name="mkv_720p" className="form-control" value={this.state.dataEpisode.mkv_720p} onChange={this.addEpisodeChange} placeholder="link"/>
                                            <label>Mkv 1080p</label>
                                            <textarea name="mkv_1080p" className="form-control" value={this.state.dataEpisode.mkv_1080p} onChange={this.addEpisodeChange} placeholder="link"/>
                                        </div>

                                        <div className="form-group col-sm-6">
                                            <label>Mp4 240p</label>
                                            <textarea name="mp4_240p" className="form-control" value={this.state.dataEpisode.mp4_240p} onChange={this.addEpisodeChange} placeholder="link"/>
                                            <label>Mp4 360p</label>
                                            <textarea name="mp4_360p" className="form-control" value={this.state.dataEpisode.mp4_360p} onChange={this.addEpisodeChange} placeholder="link"/>
                                            <label>Mp4 480p</label>
                                            <textarea name="mp4_480p" className="form-control" value={this.state.dataEpisode.mp4_480p} onChange={this.addEpisodeChange} placeholder="link"/>
                                            <label>Mp4 720p</label>
                                            <textarea name="mp4_720p" className="form-control" value={this.state.dataEpisode.mp4_720p} onChange={this.addEpisodeChange} placeholder="link"/>
                                            <label>Mp4 1080p</label>
                                            <textarea name="mp4_1080p" className="form-control" value={this.state.dataEpisode.mp4_1080p} onChange={this.addEpisodeChange} placeholder="link"/>
                                        </div>
                                    </div>
                                    
                                    <div className="form-group">
                                        <div className="col-sm-offset-2 col-sm-10">
                                            <button type="submit" className="btn btn-primary">
                                                <FontAwesomeIcon icon={faSave}/> Simpan 
                                            </button> <BtnBack/>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </section>                    
            </div>
        )
    }
}

export default AddEpisode;