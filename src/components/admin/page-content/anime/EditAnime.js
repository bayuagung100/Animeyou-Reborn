import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faArrowLeft, faSearch, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Select from 'react-select';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2';

import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { apiV1, apiV2, uAPI } from "../../../lib/Config";

class EditAnime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            dataAnime: {},
            gambar_anime: {
                icon: true,
                preview: '',
                raw: '',
            },
            loading: true,
            loadingTranslate: false,
        }
        this.editAnimeChange = this.editAnimeChange.bind(this);
        this.editAnimeSubmit = this.editAnimeSubmit.bind(this);
        this.translate = this.translate.bind(this);


        this.gambarAnimeInput = React.createRef();
        this.gambarAnimeReset = this.gambarAnimeReset.bind(this);
        this.gambarAnimeChange = this.gambarAnimeChange.bind(this);
        this.gambarAnimeAdd = this.gambarAnimeAdd.bind(this);
        this.gambarAnimeDelete = this.gambarAnimeDelete.bind(this);
    }
    gambarAnimeReset(e) {
        e.target.value = ''
    }
    gambarAnimeChange(e) {
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
    gambarAnimeAdd(e) {
        this.gambarAnimeInput.current.click();
    }
    gambarAnimeDelete(e) {
        this.setState({
            gambar_anime: {
                icon: true,
                preview: '',
                raw: '',
            }
        });
    }

    editAnimeChange(e) {
        let newdataAnime = { ...this.state.dataAnime };
        newdataAnime[e.target.name] = e.target.value;
        this.setState({
            dataAnime: newdataAnime
        }, () => console.log(this.state.dataAnime));
    }

    translate() {
        this.setState({ loadingTranslate: true })
        axios.post(uAPI + apiV1 + 'translate', {
            translate: this.state.dataAnime.synopsis
        })
            .then(response => {
                console.log(response)
                return response.data;

            })
            .then(JsonData => {
                this.setState({
                    dataAnime: {
                        ...this.state.dataAnime,
                        synopsis: JsonData.results
                    },
                    loadingTranslate: false
                })
            })
            .catch(function (error) {
                console.log(error);
            });
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
            dataAnime: {
                ...this.state.dataAnime,
                type: selected.value,
                selectedType: selected,
            }
        }, () => console.log(this.state.dataAnime));
    };

    optionsStatus = [
        { value: 'Finished Airing', label: 'Finished Airing' },
        { value: 'Currently Airing', label: 'Currently Airing' },
    ]
    statusChange = selected => {
        this.setState({
            dataAnime: {
                ...this.state.dataAnime,
                status: selected.value,
                selectedStatus: selected,
            }
        }, () => console.log(this.state.dataAnime));
    };
    producersChange = selected => {
        this.setState({
            dataAnime: {
                ...this.state.dataAnime,
                producers: selected.value,
                selectedProducers: selected,
            }
        }, () => console.log(this.state.dataAnime));
    };
    licensorsChange = selected => {
        this.setState({
            dataAnime: {
                ...this.state.dataAnime,
                licensors: selected.value,
                selectedLicensors: selected,
            }
        }, () => console.log(this.state.dataAnime));
    };
    studiosChange = selected => {
        this.setState({
            dataAnime: {
                ...this.state.dataAnime,
                studios: selected.value,
                selectedStudios: selected,
            }
        }, () => console.log(this.state.dataAnime));
    };
    genresChange = selected => {
        this.setState({
            dataAnime: {
                ...this.state.dataAnime,
                genres: selected.value,
                selectedGenres: selected,
            }
        }, () => console.log(this.state.dataAnime));
    };

    editAnimeSubmit(e) {
        e.preventDefault();
        console.log(this.state.dataAnime)
        const formData = new FormData();
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        formData.append('id', this.state.dataAnime.id);
        formData.append('idMal', this.state.dataAnime.idMal);
        formData.append('url', this.state.dataAnime.url);

        //jika ada pergantian gambar
        if (this.gambarAnimeInput.current.files[0]) {
            formData.append('images', this.state.gambar_anime.raw);
        } else {
            formData.append('images', this.state.gambar_anime.raw.name);
        }


        formData.append('title', this.state.dataAnime.title);
        formData.append('title_english', this.state.dataAnime.title_english);
        formData.append('title_synonyms', this.state.dataAnime.title_synonyms);
        formData.append('title_japanese', this.state.dataAnime.title_japanese);
        formData.append('types', this.state.dataAnime.selectedType.value);
        formData.append('episodes', this.state.dataAnime.episodes);
        formData.append('status', this.state.dataAnime.selectedStatus.value);
        formData.append('aired', this.state.dataAnime.aired);
        formData.append('premiered', this.state.dataAnime.premiered);
        formData.append('broadcast', this.state.dataAnime.broadcast);

        var producers = [];
        this.state.dataAnime.selectedProducers.forEach(el => {
            producers.push(
                { value: el.value, label: el.label }
            )
        });
        var valproducers = producers.map(a => a.value).join(",");
        formData.append('producers', valproducers);

        var licensors = [];
        this.state.dataAnime.selectedLicensors.forEach(el => {
            licensors.push(
                { value: el.value, label: el.label }
            )
        });
        var vallicensors = licensors.map(a => a.value).join(",");
        formData.append('licensors', vallicensors);

        var studios = [];
        this.state.dataAnime.selectedStudios.forEach(el => {
            studios.push(
                { value: el.value, label: el.label }
            )
        });
        var valstudios = studios.map(a => a.value).join(",");
        formData.append('studios', valstudios);

        formData.append('source', this.state.dataAnime.source);

        var genres = [];
        this.state.dataAnime.selectedGenres.forEach(el => {
            genres.push(
                { value: el.value, label: el.label }
            )
        });
        var valgenres = genres.map(a => a.value).join(",");
        formData.append('genres', valgenres);

        formData.append('duration', this.state.dataAnime.duration);
        formData.append('rating', this.state.dataAnime.rating);
        formData.append('score', this.state.dataAnime.score);
        formData.append('synopsis', this.state.dataAnime.synopsis);

        // var today = new Date();
        // var curTime = today.getFullYear()+'-'+today.getMonth()+'-'+today.getDate()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
        // formData.append('modified_time',curTime);

        var date = new Date();
        date = date.getFullYear() + '-' +
            ('00' + (date.getMonth() + 1)).slice(-2) + '-' +
            ('00' + date.getDate()).slice(-2) + ' ' +
            ('00' + date.getHours()).slice(-2) + ':' +
            ('00' + date.getMinutes()).slice(-2) + ':' +
            ('00' + date.getSeconds()).slice(-2);
        formData.append('modified_time', date);

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
                    return axios.put(uAPI + apiV2 + 'animelist', formData, config)
                        .then(function (response) {
                            //status 406 = data sudah ada (not acceptable)
                            if (response.data.status === 406) {
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
                    text: 'Success edit anime',
                    icon: 'success',
                    allowOutsideClick: false,
                }).then(() => this.setState({ redirect: true }))
            }
        })
    }

    componentDidMount() {
        axios.get(uAPI + apiV2 + 'animelist/' + this.props.id)
            .then(function (response) {
                return response;
            })
            .then(response => {
                console.log(response)
                var cek = response.data.results.length;
                var data = response.data.results[0];
                var selectedType = { value: data.types, label: data.types };
                var selectedStatus = { value: data.status, label: data.status };
                var dataProducer = data.producers === null ? '' : data.producers.split(',');
                var selectedProducers = [];
                if (dataProducer != '') {
                    dataProducer.forEach(el => {
                        selectedProducers.push(
                            { value: el, label: el }
                        )
                    });

                }
                var dataLicencors = data.licensors === null ? '' : data.licensors.split(',');
                var selectedLicensors = [];
                if (dataLicencors != '') {
                    dataLicencors.forEach(el => {
                        selectedLicensors.push(
                            { value: el, label: el }
                        )
                    });
                }


                var dataStudios = data.studios === null ? '' : data.studios.split(',');
                var selectedStudios = [];
                if (dataStudios != '') {
                    dataStudios.forEach(el => {
                        selectedStudios.push(
                            { value: el, label: el }
                        )
                    });
                }

                var dataGenres = data.genres.split(',');
                var selectedGenres = [];
                dataGenres.forEach(el => {
                    selectedGenres.push(
                        { value: el, label: el }
                    )
                });
                if (cek === 0) {
                    this.setState({
                        redirect: true
                    });
                } else {
                    this.setState({
                        dataAnime: {
                            id: data.id,
                            idMal: data.idMal,
                            url: data.url,
                            title: data.title,
                            title_english: data.title_english === null ? '' : data.title_english,
                            title_synonyms: data.title_synonyms === null ? '' : data.title_synonyms,
                            title_japanese: data.title_japanese === null ? '' : data.title_japanese,
                            types: data.types,
                            selectedType: selectedType,
                            episodes: data.episodes,
                            status: data.status,
                            selectedStatus: selectedStatus,
                            aired: data.aired,
                            premiered: data.premiered === null ? '' : data.premiered,
                            broadcast: data.broadcast === null ? '' : data.broadcast,
                            producers: data.producers,
                            selectedProducers: selectedProducers,
                            licensors: data.licensors,
                            selectedLicensors: selectedLicensors,
                            studios: data.studios,
                            selectedStudios: selectedStudios,
                            source: data.source,
                            genres: data.genres,
                            selectedGenres: selectedGenres,
                            duration: data.duration,
                            rating: data.rating,
                            score: data.score,
                            synopsis: data.synopsis,
                        },
                        loading: false,
                        gambar_anime: {
                            icon: false,
                            preview: uAPI + '/' + data.images_url,
                            raw: {
                                name: data.images,
                            },
                        },
                    }, () => console.log(this.state.dataAnime));

                }
            })
            .catch(error => {
                console.log(error);
                Swal.fire('Oops...', 'Something went wrong!', 'error');
            });
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to="/admin/anime" />)
        }
        return (
            <div>
                <section className="content" style={{ paddingTop: "20px" }}>
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
                                    ) : (
                                            <form onSubmit={e => this.editAnimeSubmit(e)} className="form-horizontal" style={{ padding: "10px" }}>
                                                <div className="form-group">
                                                    <label>ID MAL (MyAnimeList)</label>
                                                    <div className="input-group">
                                                        <input type="text" className="form-control col-sm-3" name="idMal" value={this.state.dataAnime.idMal} onChange={this.editAnimeChange} placeholder="Ex: 38883" readOnly />


                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label>Judul</label>
                                                    <input type="text" className="form-control" name="title" value={this.state.dataAnime.title} onChange={this.editAnimeChange} placeholder="Judul" required />
                                                </div>
                                                <div className="form-group">
                                                    <label>Slug (Url)</label>
                                                    <input type="text" className="form-control" name="url" value={this.state.dataAnime.url} onChange={this.editAnimeChange} placeholder="Url" required />
                                                </div>

                                                <div className="form-group">
                                                    <label>Gambar Anime</label>
                                                    <div className='col-sm-2' style={{ border: '2px dashed red' }}>
                                                        <div style={{ width: '100%', height: 'auto', }}>
                                                            {
                                                                this.state.gambar_anime.icon ? (
                                                                    <FontAwesomeIcon icon={faPlus} onClick={this.gambarAnimeAdd} color='red' style={{
                                                                        cursor: 'pointer', border: '2px dashed red', borderRadius: '100%', padding: '4px', width: '29px', height: '29px',
                                                                        display: 'inline-block',
                                                                        position: 'relative',
                                                                        top: '2px', left: '20px',
                                                                        margin: '40px',
                                                                    }} />
                                                                ) : (
                                                                        <div style={{ position: 'relative', display: 'inline-block', padding: '5px', }}>
                                                                            <img src={this.state.gambar_anime.preview} alt={this.state.gambar_anime.raw.name} style={{ width: '100%', height: 'auto', }} />
                                                                            <div style={{ position: 'relative', top: '4px' }}>
                                                                                <FontAwesomeIcon icon={faTrash} onClick={this.gambarAnimeDelete} color='red' style={{
                                                                                    cursor: 'pointer', border: '2px dashed red', borderRadius: '100%', padding: '4px', width: '29px', height: '29px',
                                                                                    position: 'relative',
                                                                                    right: '-40%',
                                                                                }} />
                                                                            </div>
                                                                        </div>
                                                                    )
                                                            }
                                                        </div>
                                                    </div>
                                                    <input id="gambar_anime" type="file" ref={this.gambarAnimeInput} style={{ display: "none" }} name="gambar_anime" onChange={this.gambarAnimeChange} onClick={this.gambarAnimeReset} />
                                                </div>

                                                <div className="row">
                                                    <div className="form-group col-sm-4">
                                                        <label>Judul (English)</label>
                                                        <textarea name="title_english" className="form-control" value={this.state.dataAnime.title_english} onChange={this.editAnimeChange} />
                                                    </div>
                                                    <div className="form-group col-sm-4">
                                                        <label>Judul (Synonyms)</label>
                                                        <textarea name="title_synonyms" className="form-control" value={this.state.dataAnime.title_synonyms} onChange={this.editAnimeChange} />
                                                    </div>
                                                    <div className="form-group col-sm-4">
                                                        <label>Judul (Japanese)</label>
                                                        <textarea name="title_japanese" className="form-control" value={this.state.dataAnime.title_japanese} onChange={this.editAnimeChange} />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="form-group col-sm-3">
                                                        <label>Type</label>
                                                        <Select
                                                            placeholder='Pilih Type'
                                                            value={this.state.dataAnime.selectedType}
                                                            onChange={this.typeChange}
                                                            options={this.optionsType}
                                                        />
                                                    </div>

                                                    <div className="form-group col-sm-3">
                                                        <label>Episode</label>
                                                        <input type="text" className="form-control" name="episodes" value={this.state.dataAnime.episodes} onChange={this.editAnimeChange} placeholder="Episode" required />
                                                    </div>

                                                    <div className="form-group col-sm-3">
                                                        <label>Status</label>
                                                        <Select
                                                            placeholder='Pilih Status'
                                                            // defaultValue={this.state.dataAnime.type}
                                                            value={this.state.dataAnime.selectedStatus}
                                                            onChange={this.statusChange}
                                                            options={this.optionsStatus}
                                                        />
                                                    </div>

                                                    <div className="form-group col-sm-3">
                                                        <label>Aired</label>
                                                        <input type="text" className="form-control" name="aired" value={this.state.dataAnime.aired} onChange={this.editAnimeChange} placeholder="Aired" required />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="form-group col-sm-3">
                                                        <label>Premiered</label>
                                                        <input type="text" className="form-control" name="premiered" value={this.state.dataAnime.premiered} onChange={this.editAnimeChange} placeholder="Premiered" />
                                                    </div>

                                                    <div className="form-group col-sm-3">
                                                        <label>Broadcast</label>
                                                        <input type="text" className="form-control" name="broadcast" value={this.state.dataAnime.broadcast} onChange={this.editAnimeChange} placeholder="Broadcast" />
                                                    </div>

                                                    <div className="form-group col-sm-3">
                                                        <label>Source</label>
                                                        <input type="text" className="form-control" name="source" value={this.state.dataAnime.source} onChange={this.editAnimeChange} placeholder="Source" required />
                                                    </div>

                                                    <div className="form-group col-sm-3">
                                                        <label>Duration</label>
                                                        <input type="text" className="form-control" name="duration" value={this.state.dataAnime.duration} onChange={this.editAnimeChange} placeholder="Duration" required />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="form-group col-sm-3">
                                                        <label>Rating</label>
                                                        <input type="text" className="form-control" name="rating" value={this.state.dataAnime.rating} onChange={this.editAnimeChange} placeholder="Rating" required />
                                                    </div>

                                                    <div className="form-group col-sm-3">
                                                        <label>Score</label>
                                                        <input type="text" className="form-control" name="score" value={this.state.dataAnime.score} onChange={this.editAnimeChange} placeholder="Score" required />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="form-group col-sm-3">
                                                        <label>Producers</label>
                                                        <Select
                                                            placeholder='Pilih Producers'
                                                            value={this.state.dataAnime.selectedProducers}
                                                            onChange={this.producersChange}
                                                            options={this.state.dataAnime.optionsProducers}
                                                            isMulti
                                                        />
                                                    </div>
                                                    <div className="form-group col-sm-3">
                                                        <label>Licensors</label>
                                                        <Select
                                                            placeholder='Pilih Licensors'
                                                            value={this.state.dataAnime.selectedLicensors}
                                                            onChange={this.licensorsChange}
                                                            options={this.state.dataAnime.optionsLicensors}
                                                            isMulti
                                                        />
                                                    </div>
                                                    <div className="form-group col-sm-3">
                                                        <label>Studios</label>
                                                        <Select
                                                            placeholder='Pilih Studios'
                                                            value={this.state.dataAnime.selectedStudios}
                                                            onChange={this.studiosChange}
                                                            options={this.state.dataAnime.optionsStudios}
                                                            isMulti
                                                        />
                                                    </div>
                                                    <div className="form-group col-sm-3">
                                                        <label>Genres</label>
                                                        <Select
                                                            placeholder='Pilih Genres'
                                                            value={this.state.dataAnime.selectedGenres}
                                                            onChange={this.genresChange}
                                                            options={this.state.dataAnime.optionsGenres}
                                                            isMulti
                                                        />
                                                    </div>
                                                </div>

                                                <div className="form-group">

                                                    <div className="input-group">
                                                        <label>Deskripsi</label>
                                                        <div className="input-group-btn" style={{ marginLeft: '10px' }}>
                                                            <button type="button" className="btn btn-default" onClick={this.translate}>Translate</button>
                                                        </div>
                                                        {
                                                            this.state.loadingTranslate ? (<div style={{ lineHeight: "2.3", marginLeft: "10px" }}>Loading ...</div>) : null
                                                        }

                                                    </div>

                                                    <textarea name="synopsis" className="form-control" value={this.state.dataAnime.synopsis} onChange={this.editAnimeChange} rows='9' required />
                                                </div>

                                                <div className="form-group">
                                                    <div className="col-sm-offset-2 col-sm-10">
                                                        <button type="submit" className="btn btn-primary">
                                                            <FontAwesomeIcon icon={faSave} /> Simpan
                                                </button> <Link to="/admin/anime" className="btn btn-warning" ><FontAwesomeIcon icon={faArrowLeft} /> Batal</Link>
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