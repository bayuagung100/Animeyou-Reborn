import React, { Component } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faArrowLeft, faSearch, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
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
            
            gambar_anime: {
                icon: true,
                preview: '',
                raw: '',
            },
            dataJikan: {
                idMal: '',
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
                optionsProducers: [],
                selectedProducers: [],
                
                licensors: [],
                optionsLicensors: [],
                selectedLicensors: [],

                studios: [],
                optionsStudios: [],
                selectedStudios: [],

                genres: [],
                optionsGenres: [],
                selectedGenres: [],
                
                
            },
            loadingGet: false,
            loadingTranslate: false,
        }
        this.getJikan = this.getJikan.bind(this);
        this.addAnimeChange = this.addAnimeChange.bind(this);
        this.addAnimeSubmit = this.addAnimeSubmit.bind(this);
        this.translate = this.translate.bind(this);

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
    
    getJikan(e){
        this.setState({
            dataJikan: {
                ...this.state.dataJikan,
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
                optionsProducers: [],
                selectedProducers: [],
                
                licensors: [],
                optionsLicensors: [],
                selectedLicensors: [],

                studios: [],
                optionsStudios: [],
                selectedStudios: [],

                genres: [],
                optionsGenres: [],
                selectedGenres: [],
            },
            loadingGet: true,
        })
        axios.get(uAPIlocal+'/api/v1/jikan/findanime/'+this.state.dataJikan.idMal)
        .then(function(response) {
            return response.data;
        })
        .then(response => {
            var results = response.results;
            var cekProducer = results.producers.length;
            var cekLicensor = results.licensors.length;
            var cekStudio = results.studios.length;
            var cekGenre = results.genres.length;

            if (cekProducer > 0 ) {
                const Obj = [];
                this.state.dataJikan.selectedProducers.forEach(el => {
                    Obj.push(
                        el.value,
                    )
                });
                const Obj2 = [];
                this.state.dataJikan.optionsProducers.forEach(el => {
                    Obj2.push(
                        el.value,
                    )
                });
                results.producers.forEach(el => {
                    const dataProducer = {value: el.name, label: el.name};
                    // console.log(dataProducer.value)
                    const onTheList = Obj.includes(dataProducer.value);
                    const onTheList2 = Obj2.includes(dataProducer.value);
                    if (!onTheList) {
                        this.setState({
                            dataJikan: {
                                ...this.state.dataJikan,
                                selectedProducers: [...this.state.dataJikan.selectedProducers, dataProducer],
                            }
                        })
                    }
                    if (!onTheList2) {
                        this.setState({
                            dataJikan: {
                                ...this.state.dataJikan,
                                optionsProducers: [...this.state.dataJikan.optionsProducers, dataProducer],
                            }
                        })
                    }
                });
                
            }
            if (cekLicensor > 0 ) {
                const Obj = [];
                this.state.dataJikan.selectedLicensors.forEach(el => {
                    Obj.push(
                        el.value,
                    )
                });
                const Obj2 = [];
                this.state.dataJikan.optionsLicensors.forEach(el => {
                    Obj2.push(
                        el.value,
                    )
                });
                results.licensors.forEach(el => {
                    const dataLicensor = {value: el.name, label: el.name};
                    // console.log(dataProducer.value)
                    const onTheList = Obj.includes(dataLicensor.value);
                    const onTheList2 = Obj2.includes(dataLicensor.value);
                    if (!onTheList) {
                        this.setState({
                            dataJikan: {
                                ...this.state.dataJikan,
                                selectedLicensors: [...this.state.dataJikan.selectedLicensors, dataLicensor],
                            }
                        })
                    }
                    if (!onTheList2) {
                        this.setState({
                            dataJikan: {
                                ...this.state.dataJikan,
                                optionsLicensors: [...this.state.dataJikan.optionsLicensors, dataLicensor],
                            }
                        })
                    }
                });
                
            }
            if (cekStudio > 0 ) {
                const Obj = [];
                this.state.dataJikan.selectedStudios.forEach(el => {
                    Obj.push(
                        el.value,
                    )
                });
                const Obj2 = [];
                this.state.dataJikan.optionsStudios.forEach(el => {
                    Obj2.push(
                        el.value,
                    )
                });
                results.studios.forEach(el => {
                    const dataStudio = {value: el.name, label: el.name};
                    // console.log(dataProducer.value)
                    const onTheList = Obj.includes(dataStudio.value);
                    const onTheList2 = Obj2.includes(dataStudio.value);
                    if (!onTheList) {
                        this.setState({
                            dataJikan: {
                                ...this.state.dataJikan,
                                selectedStudios: [...this.state.dataJikan.selectedStudios, dataStudio],
                            }
                        })
                    }
                    if (!onTheList2) {
                        this.setState({
                            dataJikan: {
                                ...this.state.dataJikan,
                                optionsStudios: [...this.state.dataJikan.optionsStudios, dataStudio],
                            }
                        })
                    }
                });
                
            }
            if (cekGenre > 0 ) {
                const Obj = [];
                this.state.dataJikan.selectedGenres.forEach(el => {
                    Obj.push(
                        el.value,
                    )
                });
                const Obj2 = [];
                this.state.dataJikan.optionsGenres.forEach(el => {
                    Obj2.push(
                        el.value,
                    )
                });
                results.genres.forEach(el => {
                    const dataGenre = {value: el.name, label: el.name};
                    // console.log(dataProducer.value)
                    const onTheList = Obj.includes(dataGenre.value);
                    const onTheList2 = Obj2.includes(dataGenre.value);
                    if (!onTheList) {
                        this.setState({
                            dataJikan: {
                                ...this.state.dataJikan,
                                selectedGenres: [...this.state.dataJikan.selectedGenres, dataGenre],
                            }
                        })
                    }
                    if (!onTheList2) {
                        this.setState({
                            dataJikan: {
                                ...this.state.dataJikan,
                                optionsGenres: [...this.state.dataJikan.optionsGenres, dataGenre],
                            }
                        })
                    }
                });
                
            }
            
            this.setState({
                dataJikan: {
                    ...this.state.dataJikan,
                    title: results.title,
                    url: convert_seo(results.title),

                    title_english: results.title_english===null ? '':results.title_english,
                    title_japanese: results.title_japanese===null ? '':results.title_japanese,
                    title_synonyms: results.title_synonyms===null ? '':results.title_synonyms,

                    type: results.type,
                    selectedType: {value: results.type, label: results.type},
                    episodes: results.episodes,
                    status: results.status,
                    selectedStatus: {value: results.status, label: results.status},
                    aired: results.aired.string,

                    premiered: results.premiered===null ? '':results.premiered,
                    broadcast: results.broadcast===null ? '':results.broadcast,
                    source: results.source,
                    duration: results.duration,

                    rating: results.rating,
                    score: results.score,

                    synopsis: results.synopsis,
                    
                    producers: results.producers,
                    licensors: results.licensors,
                    studios: results.studios,
                    genres: results.genres,
                },
                loadingGet: false,
            },()=>console.log(this.state.dataJikan))
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    translate(){
        this.setState({loadingTranslate: true})
        axios.post(uAPIlocal+'/api/v1/translate', {
            translate: this.state.dataJikan.synopsis
        })
        .then(response => {
            console.log(response)
            return response.data;
            
        })
        .then(JsonData => {
            this.setState({
                dataJikan: {
                    ...this.state.dataJikan,
                    synopsis: JsonData.results
                },
                loadingTranslate: false
            })
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
        console.log(this.state.dataJikan)
        const formData = new FormData();
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        formData.append('idMal',this.state.dataJikan.idMal);
        formData.append('url',this.state.dataJikan.url);
        formData.append('images',this.state.gambar_anime.raw);
        formData.append('title',this.state.dataJikan.title);
        formData.append('title_english',this.state.dataJikan.title_english);
        formData.append('title_synonyms',this.state.dataJikan.title_synonyms);
        formData.append('title_japanese',this.state.dataJikan.title_japanese);
        formData.append('types',this.state.dataJikan.selectedType.value);
        formData.append('episodes',this.state.dataJikan.episodes);
        formData.append('status',this.state.dataJikan.selectedStatus.value);
        formData.append('aired',this.state.dataJikan.aired);
        formData.append('premiered',this.state.dataJikan.premiered);
        formData.append('broadcast',this.state.dataJikan.broadcast);

        var producers = [];
        this.state.dataJikan.selectedProducers.forEach(el => {
            producers.push(
                {value: el.value, label: el.label}
            )
        });
        var valproducers = producers.map(a => a.value).join(",");
        formData.append('producers',valproducers);

        var licensors = [];
        this.state.dataJikan.selectedLicensors.forEach(el => {
            licensors.push(
                {value: el.value, label: el.label}
            )
        });
        var vallicensors = licensors.map(a => a.value).join(",");
        formData.append('licensors',vallicensors);

        var studios = [];
        this.state.dataJikan.selectedStudios.forEach(el => {
            studios.push(
                {value: el.value, label: el.label}
            )
        });
        var valstudios = studios.map(a => a.value).join(",");
        formData.append('studios',valstudios);

        formData.append('source',this.state.dataJikan.source);

        var genres = [];
        this.state.dataJikan.selectedGenres.forEach(el => {
            genres.push(
                {value: el.value, label: el.label}
            )
        });
        var valgenres = genres.map(a => a.value).join(",");
        formData.append('genres',valgenres);

        formData.append('duration',this.state.dataJikan.duration);
        formData.append('rating',this.state.dataJikan.rating);
        formData.append('score',this.state.dataJikan.score);
        formData.append('synopsis',this.state.dataJikan.synopsis);
        formData.append('views',0);

        // var today = new Date();
        // var curTime = today.getFullYear()+'-'+today.getMonth()+'-'+today.getDate()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
        // formData.append('published_time',curTime);
        // formData.append('modified_time',curTime);

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
                if (this.state.gambar_anime.icon === true) {
                    Swal.fire({
                        title: 'Oops!',
                        text: 'Gambar Anime Tidak Ada!',
                        icon: 'error',
                        allowOutsideClick: false
                    })
                } else {
                    return axios.post(uAPIlocal+'/api/v1/animelist',formData,config)
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
                    text: 'Success tambah anime',
                    icon: 'success',
                    allowOutsideClick: false,
                }).then(() => this.setState({ redirect: true }))
            }
        })
    }
    optionsType = [
        { value: 'TV', label: 'TV' },
        { value: 'Movie', label: 'Movie' },
        { value: 'OVA', label: 'OVA' },
        { value: 'ONA', label: 'ONA' },
        { value: 'Special', label: 'Special' },
    ]
    typeChange = selected => {
        this.setState({ 
            dataJikan:{
                ...this.state.dataJikan,
                type: selected.value,
                selectedType: selected,
            }
        },()=>console.log(this.state.dataJikan));
    };
    optionsStatus = [
        { value: 'Finished Airing', label: 'Finished Airing' },
        { value: 'Currently Airing', label: 'Currently Airing' },
    ]
    statusChange = selected => {
        this.setState({ 
            dataJikan:{
                ...this.state.dataJikan,
                status: selected.value,
                selectedStatus: selected,
            }
        },()=>console.log(this.state.dataJikan));
    };
    producersChange = selected => {
        this.setState({ 
            dataJikan:{
                ...this.state.dataJikan,
                producers: selected.value,
                selectedProducers: selected,
            }
        },()=>console.log(this.state.dataJikan));
    };
    licensorsChange = selected => {
        this.setState({ 
            dataJikan:{
                ...this.state.dataJikan,
                licensors: selected.value,
                selectedLicensors: selected,
            }
        },()=>console.log(this.state.dataJikan));
    };
    studiosChange = selected => {
        this.setState({ 
            dataJikan:{
                ...this.state.dataJikan,
                studios: selected.value,
                selectedStudios: selected,
            }
        },()=>console.log(this.state.dataJikan));
    };
    genresChange = selected => {
        this.setState({ 
            dataJikan:{
                ...this.state.dataJikan,
                genres: selected.value,
                selectedGenres: selected,
            }
        },()=>console.log(this.state.dataJikan));
    };
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
                                <h3 className="card-title">Tambah Anime</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={e => this.addAnimeSubmit(e)} className="form-horizontal" style={{padding:"10px"}}>
                                    <div className="form-group">
                                        <label>ID MAL (MyAnimeList)</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control col-sm-3" name="idMal" value={this.state.dataJikan.idMal}  onChange={this.addAnimeChange} placeholder="Ex: 38883" required/>
                                        
                                            <div className="input-group-btn">
                                                <button type="button" className="btn btn-default" onClick={e => this.getJikan(e)}>
                                                <FontAwesomeIcon icon={faSearch}/> Get
                                                </button>
                                            </div>
                                            {
                                                this.state.loadingGet ? (<div style={{lineHeight: "2.3", marginLeft: "10px"}}>Loading ...</div>):null
                                            }
                                            
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
                                                value={this.state.dataJikan.selectedType}
                                                onChange={this.typeChange}
                                                options={this.optionsType}
                                            />
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
                                        </div>

                                        <div className="form-group col-sm-3">
                                            <label>Aired</label>
                                            <input type="text" className="form-control" name="aired" value={this.state.dataJikan.aired}  onChange={this.addAnimeChange} placeholder="Aired" required/>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-group col-sm-3">
                                            <label>Premiered</label>
                                            <input type="text" className="form-control" name="premiered" value={this.state.dataJikan.premiered}  onChange={this.addAnimeChange} placeholder="Premiered" />
                                        </div>

                                        <div className="form-group col-sm-3">
                                            <label>Broadcast</label>
                                            <input type="text" className="form-control" name="broadcast" value={this.state.dataJikan.broadcast}  onChange={this.addAnimeChange} placeholder="Broadcast" />
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
                                                value={this.state.dataJikan.selectedProducers}
                                                onChange={this.producersChange}
                                                options={this.state.dataJikan.optionsProducers}
                                                isMulti
                                            />
                                        </div>
                                        <div className="form-group col-sm-3">
                                            <label>Licensors</label>
                                            <Select
                                                placeholder='Pilih Licensors'
                                                value={this.state.dataJikan.selectedLicensors}
                                                onChange={this.licensorsChange}
                                                options={this.state.dataJikan.optionsLicensors}
                                                isMulti
                                            />
                                        </div>
                                        <div className="form-group col-sm-3">
                                            <label>Studios</label>
                                            <Select
                                                placeholder='Pilih Studios'
                                                value={this.state.dataJikan.selectedStudios}
                                                onChange={this.studiosChange}
                                                options={this.state.dataJikan.optionsStudios}
                                                isMulti
                                            />
                                        </div>
                                        <div className="form-group col-sm-3">
                                            <label>Genres</label>
                                            <Select
                                                placeholder='Pilih Genres'
                                                value={this.state.dataJikan.selectedGenres}
                                                onChange={this.genresChange}
                                                options={this.state.dataJikan.optionsGenres}
                                                isMulti
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        
                                        <div className="input-group">
                                            <label>Deskripsi</label>
                                            <div className="input-group-btn" style={{marginLeft:'10px'}}>
                                                <button type="button" className="btn btn-default" onClick={this.translate}>Translate</button>
                                            </div>
                                            {
                                                this.state.loadingTranslate ? (<div style={{lineHeight: "2.3", marginLeft: "10px"}}>Loading ...</div>):null
                                            }
                                            
                                        </div>
                                        
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