import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faArrowLeft, faSearch, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

// ES6 Modules or TypeScript
import Swal from 'sweetalert2';

import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const uAPIlocal = 'http://'+window.location.hostname+':8080';

class EditAnime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect : false,
            dataAnime: {},
            gambar_anime: {
                icon: true,
                preview: '',
                raw: '',
            },
            loading: true,
            
        }
        this.editAnimeChange = this.editAnimeChange.bind(this);
        this.editAnimeSubmit = this.editAnimeSubmit.bind(this);

        this.gambarAnimeInput = React.createRef();
        this.gambarAnimeReset = this.gambarAnimeReset.bind(this);
        this.gambarAnimeChange = this.gambarAnimeChange.bind(this);
        this.gambarAnimeAdd = this.gambarAnimeAdd.bind(this);
        this.gambarAnimeDelete = this.gambarAnimeDelete.bind(this);
    }
    gambarAnimeReset(e){
        e.target.value=''
    }
    gambarAnimeChange(e){
        if (e.target.files && e.target.files[0]) {
          let img = e.target.files[0];
          this.setState({
            gambar_anime: {
                icon: false,
                //show imagenya
                preview: URL.createObjectURL(img),

                //show data imagenya
                raw: img,
            }
          });
        }
    };
    gambarAnimeAdd(e){
        this.gambarAnimeInput.current.click();
    }
    gambarAnimeDelete(e){
        this.setState({
            gambar_anime: {
                icon: true,
                preview: '',
                raw: '',
            }
        });
    }

    componentDidMount(){
        axios.get(uAPIlocal+'/api/v1/animelist/'+this.props.id)
        .then(function(response) {
            return response;
        })
        .then(response => {
            var cek = response.data.results.length;
            var data = response.data.results[0];
            if (cek===0) {
                this.setState({
                    redirect: true
                });
            } else {
                this.setState({
                    dataAnime: data,
                    loading: false,
                    gambar_anime: {
                        icon: false,
                        preview: uAPIlocal+'/'+data.images_url,
                        raw: {
                            name: data.images,
                        },
                    },
                },()=>console.log(this.state.dataAnime));
                
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    editAnimeChange(e) {
        let newdataAnime = { ...this.state.dataAnime };
        newdataAnime[e.target.name] = e.target.value;
        this.setState({
            dataAnime: newdataAnime
        },()=>console.log(this.state.dataAnime));
    }

    editAnimeSubmit(e){
        e.preventDefault();
        console.log(this.state.dataAnime)
        const formData = new FormData();
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        formData.append('title_english',this.state.dataAnime.title_english===null ? "":this.state.dataAnime.title_english);
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ': ' + pair[1]); 
        }
        // Swal.fire({
        //     title: 'Are you sure?',
        //     icon: 'warning',
        //     showCancelButton: true,
        //     confirmButtonColor: '#3085d6',
        //     cancelButtonColor: '#d33',
        //     confirmButtonText: 'Yes!',
        //     allowOutsideClick: false,
        //     showLoaderOnConfirm: true,
        //     preConfirm: () => {
        //         return axios.put(uAPIlocal+'/api/v1/animelist',{
                    
        //         })
        //         .catch(function (error) {
        //             console.log(error);
        //             Swal.fire('Oops...', 'Something went wrong!', 'error');
        //         });
        //     }
        // }).then((result) => {
        //     if (result.value) {
        //         Swal.fire({
        //             title: 'Success!',
        //             text: 'Success edit anime',
        //             icon: 'success',
        //             allowOutsideClick: false,
        //         }).then(() => this.setState({ redirect: true }))
        //     }
        // })
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to="/admin/anime" />)
        }
        return (
            <div>
                <section className="content" style={{paddingTop:"20px"}}>
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Edit Anime</h3>
                            </div>
                            <div className="card-body">
                            {
                                this.state.loading ? (
                                    <div className="text-center" >
                                        <Loader type="Bars" color="#00BFFF" height={60} width={100} />
                                        Loading ...
                                    </div>
                                ):(
                                    <form onSubmit={e => this.editAnimeSubmit(e)} className="form-horizontal" style={{padding:"10px"}}>
                                        <div className="form-group">
                                            <label>ID MAL (MyAnimeList)</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control col-sm-3" name="idMal" value={this.state.dataAnime.idMal}  onChange={this.editAnimeChange} placeholder="Ex: 38883" readOnly/>
                                            
                                                
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Judul</label>
                                            <input type="text" className="form-control" name="title" value={this.state.dataAnime.title}  onChange={this.editAnimeChange} placeholder="Judul" required/>
                                        </div>
                                        <div className="form-group">
                                            <label>Slug (Url)</label>
                                            <input type="text" className="form-control" name="url" value={this.state.dataAnime.url}  onChange={this.editAnimeChange} placeholder="Url" required/>
                                        </div>

                                        <div className="form-group">
                                            <label>Gambar Anime</label>
                                            <div className='col-sm-2' style={{border:'2px dashed red'}}>
                                                <div style={{width: '100%',height: 'auto',}}>
                                                {
                                                    this.state.gambar_anime.icon ? (
                                                        <FontAwesomeIcon icon={faPlus} onClick={this.gambarAnimeAdd} color='red' style={{
                                                            cursor:'pointer', border:'2px dashed red', borderRadius:'100%', padding:'4px', width:'29px', height:'29px',
                                                            display: 'inline-block',
                                                            position: 'relative',
                                                            top: '2px', left:'20px',
                                                            margin: '40px',
                                                        }} />
                                                    ):(
                                                        <div style={{position: 'relative',display: 'inline-block',padding: '5px',}}>
                                                            <img src={this.state.gambar_anime.preview} alt={this.state.gambar_anime.raw.name} style={{width: '100%',height: 'auto',}}/>
                                                            <div style={{position:'relative',top:'4px'}}>
                                                                <FontAwesomeIcon icon={faTrash} onClick={this.gambarAnimeDelete} color='red' style={{
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
                                            <input id="gambar_anime" type="file" ref={this.gambarAnimeInput} style={{ display: "none" }} name="gambar_anime" onChange={this.gambarAnimeChange} onClick={this.gambarAnimeReset}/>
                                        </div>

                                        <div className="row">
                                            <div className="form-group col-sm-4">
                                                <label>Judul (English)</label>
                                                <textarea name="title_english" className="form-control" value={this.state.dataAnime.title_english===null ? "":this.state.dataAnime.title_english} onChange={this.editAnimeChange} />
                                            </div>
                                            <div className="form-group col-sm-4">
                                                <label>Judul (Synonyms)</label>
                                                <textarea name="title_synonyms" className="form-control" value={this.state.dataAnime.title_synonyms===null ? "":this.state.dataAnime.title_synonyms} onChange={this.editAnimeChange} />
                                            </div>
                                            <div className="form-group col-sm-4">
                                                <label>Judul (Japanese)</label>
                                                <textarea name="title_japanese" className="form-control" value={this.state.dataAnime.title_japanese===null ? "":this.state.dataAnime.title_japanese} onChange={this.editAnimeChange} />
                                            </div>
                                        </div>
                                        
                                        <div className="form-group">
                                            <div className="col-sm-offset-2 col-sm-10">
                                                <button type="submit" className="btn btn-primary">
                                                    <FontAwesomeIcon icon={faSave}/> Simpan 
                                                </button> <Link to="/admin/anime" className="btn btn-warning" ><FontAwesomeIcon icon={faArrowLeft}/> Batal</Link>
                                            </div>
                                        </div>
                                    </form>
                                )
                            }
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default EditAnime;