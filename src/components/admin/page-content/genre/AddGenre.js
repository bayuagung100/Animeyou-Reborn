import React, { Component } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

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

class AddGenre extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect : false,
            addGenre: {
                genre: '',
            },
        }
        this.addGenreChange = this.addGenreChange.bind(this);
        this.addGenreSubmit = this.addGenreSubmit.bind(this);
    }

    componentDidMount(){
    }

    addGenreChange(e) {
        let newaddGenre = { ...this.state.addGenre };
        newaddGenre[e.target.name] = e.target.value;
        this.setState({
            addGenre: newaddGenre
        });
    }

    addGenreSubmit(e){
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
                                        <label>Nama Genre</label>
                                        <input type="text" className="form-control" name="genre" value={this.state.addGenre.genre}  onChange={this.addGenreChange} placeholder="Nama Genre" required/>
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

export default AddGenre;