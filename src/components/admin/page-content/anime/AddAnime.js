import React, { Component } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faArrowLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Select from 'react-select';
import $ from 'jquery';

// ES6 Modules or TypeScript
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


class AddAnime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect : false,
            idMal: '',
            dataJikan: {
                title: '',
                url: '',

                title_english: '',
                title_japanese: '',
                title_synonyms: [],

                type: '',
                selectedType: '',
                episodes: '',
                status: '',
                selectedStatus: '',
                aired: '',

                premiered: '',
                broadcast: '',
                source: '',
                duration: '',

                rating: '',
                score: '',

                synopsis: '',
                
                producers: [],
                licensors: [],
                studios: [],
                genres: [],
                
                
            },
        }
        this.onChange = this.onChange.bind(this);
        this.getJikan = this.getJikan.bind(this);
        this.addAnimeChange = this.addAnimeChange.bind(this);
        this.addAnimeSubmit = this.addAnimeSubmit.bind(this);
    }

    
    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    getJikan(e){
        let id_mal = this.state.idMal;
        console.log(id_mal)
        axios.get(uAPIlocal+'/api/v1/jikan/findanime/'+id_mal)
        .then(function(response) {
            return response.data;
        })
        .then(response => {
            var results = response.results;
            var cekProducer = results.producers.length;
            
            if (cekProducer > 0 ) {
                
            }
            this.setState({
                dataJikan: {
                    ...this.state.dataJikan,
                    title: results.title,
                    url: convert_seo(results.title),

                    title_english: results.title_english,
                    title_japanese: results.title_japanese,
                    title_synonyms: results.title_synonyms,

                    type: results.type,
                    selectedType: {value: results.type, label: results.type},
                    episodes: results.episodes,
                    status: results.status,
                    selectedStatus: {value: results.status, label: results.status},
                    aired: results.aired.string,

                    premiered: results.premiered,
                    broadcast: results.broadcast,
                    source: results.source,
                    duration: results.duration,

                    rating: results.rating,
                    score: results.score,

                    synopsis: results.synopsis,
                    
                    producers: results.producers,
                    licensors: results.licensors,
                    studios: results.studios,
                    genres: results.genres,
                }
            },()=>console.log(this.state.dataJikan))
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    componentDidMount(){
       
    }

    addAnimeChange(e) {
        let newaddAnime = { ...this.state.dataJikan };
        newaddAnime[e.target.name] = e.target.value;
        this.setState({
            dataJikan: newaddAnime
        },()=>console.log(this.state.dataJikan));
        
    }

    addAnimeSubmit(e){
        e.preventDefault();
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
                return axios.post(uAPIlocal+'/api/v1/genrelist',{
                    genre: this.state.addGenre.genre,
                })
                .catch(function (error) {
                    console.log(error);
                    Swal.fire('Oops...', 'Something went wrong!', 'error');
                });
            }
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Success tambah genre',
                    icon: 'success',
                    allowOutsideClick: false,
                }).then(() => this.setState({ redirect: true }))
            }
        })
    }
    optionsType = [
        { value: 'Tv', label: 'Tv' },
        { value: 'Movie', label: 'Movie' },
        { value: 'OVA', label: 'OVA' },
        { value: 'ONA', label: 'ONA' },
        { value: 'Special', label: 'Special' },
    ]
    typeChange = selectedType => {
        this.setState({ 
            dataJikan:{
                ...this.state.dataJikan,
                type: selectedType.value,
                selectedType: selectedType,
            }
        },()=>console.log(this.state.dataJikan));
    };
    optionsStatus = [
        { value: 'Finished Airing', label: 'Finished Airing' },
        { value: 'Currently Airing', label: 'Currently Airing' },
    ]
    statusChange = selectedStatus => {
        this.setState({ 
            dataJikan:{
                ...this.state.dataJikan,
                type: selectedStatus.value,
                selectedStatus: selectedStatus,
            }
        },()=>console.log(this.state.dataJikan));
    };
    render() {
        if (this.state.redirect) {
            return (<Redirect to="/admin/genre" />)
        }
        return (
            <div>
                <section className="content" style={{paddingTop:"20px"}}>
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Tambah Genre</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={e => this.addGenreSubmit(e)} className="form-horizontal" style={{padding:"10px"}}>
                                    <div className="form-group">
                                        <label>ID MAL (MyAnimeList)</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control col-sm-3" name="idMal" value={this.state.idMal}  onChange={this.onChange} placeholder="Ex: 38883" required/>
                                        
                                            <div className="input-group-btn">
                                                <button type="button" className="btn btn-default" onClick={e => this.getJikan(e)}>
                                                <FontAwesomeIcon icon={faSearch}/> Get
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Judul</label>
                                        <input type="text" className="form-control" name="title" value={this.state.dataJikan.title}  onChange={this.addAnimeChange} placeholder="Judul" required/>
                                    </div>
                                    <div className="form-group">
                                        <label>Slug (Url)</label>
                                        <input type="text" className="form-control" name="url" value={this.state.dataJikan.url}  onChange={this.addAnimeChange} placeholder="Url" required/>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="form-group col-sm-4">
                                            <label>Judul (English)</label>
                                            {/* <input type="text" className="form-control" name="title_english" value={this.state.dataJikan.title_english}  onChange={this.addAnimeChange} placeholder="Judul (English)"/> */}
                                            <textarea name="title_english" className="form-control" value={this.state.dataJikan.title_english} onChange={this.addAnimeChange} />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Judul (Synonyms)</label>
                                            {/* <input type="text" className="form-control" name="title_synonyms" value={this.state.dataJikan.title_synonyms}  onChange={this.addAnimeChange} placeholder="Judul (Synonyms)"/> */}
                                            <textarea name="title_synonyms" className="form-control" value={this.state.dataJikan.title_synonyms} onChange={this.addAnimeChange} />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Judul (Japanese)</label>
                                            {/* <input type="text" className="form-control" name="title_japanese" value={this.state.dataJikan.title_japanese}  onChange={this.addAnimeChange} placeholder="Judul (Japanese)"/> */}
                                            <textarea name="title_japanese" className="form-control" value={this.state.dataJikan.title_japanese} onChange={this.addAnimeChange} />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-group col-sm-3">
                                            <label>Type</label>
                                            <Select
                                                placeholder='Pilih Type'
                                                // defaultValue={this.state.dataJikan.type}
                                                value={this.state.dataJikan.selectedType}
                                                onChange={this.typeChange}
                                                options={this.optionsType}
                                            />
                                            {/* <select className="form-control select2" name="type" value={this.state.dataJikan.type} onChange={this.addAnimeChange} required>
                                                <option value="Tv">Tv</option>
                                                <option value="Movie">Movie</option>
                                                <option value="OVA">OVA</option>
                                                <option value="ONA">ONA</option>
                                                <option value="Special">Special</option>
                                            </select> */}
                                        </div>

                                        <div className="form-group col-sm-3">
                                            <label>Episode</label>
                                            <input type="text" className="form-control" name="episodes" value={this.state.dataJikan.episodes}  onChange={this.addAnimeChange} placeholder="Episode" required/>
                                        </div>

                                        <div className="form-group col-sm-3">
                                            <label>Status</label>
                                            <Select
                                                placeholder='Pilih Status'
                                                // defaultValue={this.state.dataJikan.type}
                                                value={this.state.dataJikan.selectedStatus}
                                                onChange={this.statusChange}
                                                options={this.optionsStatus}
                                            />
                                            {/* <select className="form-control select2" name="status" value={this.state.dataJikan.status} onChange={this.addAnimeChange} required>
                                                <option value="Finished Airing">Finished Airing</option>
                                                <option value="Currently Airing">Currently Airing</option>
                                            </select> */}
                                        </div>

                                        <div className="form-group col-sm-3">
                                            <label>Aired</label>
                                            <input type="text" className="form-control" name="aired" value={this.state.dataJikan.aired}  onChange={this.addAnimeChange} placeholder="Aired" required/>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-group col-sm-3">
                                            <label>Premiered</label>
                                            <input type="text" className="form-control" name="premiered" value={this.state.dataJikan.premiered}  onChange={this.addAnimeChange} placeholder="Premiered" required/>
                                        </div>

                                        <div className="form-group col-sm-3">
                                            <label>Broadcast</label>
                                            <input type="text" className="form-control" name="broadcast" value={this.state.dataJikan.broadcast}  onChange={this.addAnimeChange} placeholder="Broadcast" required/>
                                        </div>

                                        <div className="form-group col-sm-3">
                                            <label>Source</label>
                                            <input type="text" className="form-control" name="source" value={this.state.dataJikan.source}  onChange={this.addAnimeChange} placeholder="Source" required/>
                                        </div>

                                        <div className="form-group col-sm-3">
                                            <label>Duration</label>
                                            <input type="text" className="form-control" name="duration" value={this.state.dataJikan.duration}  onChange={this.addAnimeChange} placeholder="Duration" required/>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-group col-sm-3">
                                            <label>Rating</label>
                                            <input type="text" className="form-control" name="rating" value={this.state.dataJikan.rating}  onChange={this.addAnimeChange} placeholder="Rating" required/>
                                        </div>

                                        <div className="form-group col-sm-3">
                                            <label>Score</label>
                                            <input type="text" className="form-control" name="score" value={this.state.dataJikan.score}  onChange={this.addAnimeChange} placeholder="Score" required/>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-group col-sm-3">
                                            <label>Producers</label>
                                            <Select
                                                placeholder='Pilih Producers'
                                                // value={this.state.dataJikan.selectedProducers}
                                                onChange={this.kategoriChange}
                                                options={this.state.kategoriList}
                                                isMulti
                                            />
                                            {/* <select className="form-control select2" name="producers" multiple={true}  value={this.state.dataJikan.producers} onChange={this.addAnimeChange} required>
                                                <option value="Tv">Tv</option>
                                                <option value="Movie">Movie</option>
                                                <option value="OVA">OVA</option>
                                                <option value="ONA">ONA</option>
                                                <option value="Special">Special</option>
                                            </select> */}
                                        </div>
                                        

                                        {/* <div className="form-group col-sm-3">
                                            <label>Status</label>
                                            <select className="form-control select2" name="status" value={this.state.dataJikan.status} onChange={this.addAnimeChange} required>
                                                <option value="Finished Airing">Finished Airing</option>
                                                <option value="Currently Airing">Currently Airing</option>
                                            </select>
                                        </div> */}
                                    </div>

                                    <div className="form-group">
                                        <label>Deskripsi</label>
                                        <textarea name="synopsis" className="form-control" value={this.state.dataJikan.synopsis} onChange={this.addAnimeChange} rows='9' required/>
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
        );
    }
}

export default AddAnime;