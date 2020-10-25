import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

// ES6 Modules or TypeScript
import Swal from 'sweetalert2';

import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const uAPIlocal = 'http://'+window.location.hostname+':8080';

class EditProducer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect : false,
            dataProducer: {
                id: '',
                producer: '',
            },
            loading: true,
        }
        this.editProducerChange = this.editProducerChange.bind(this);
        this.editProducerSubmit = this.editProducerSubmit.bind(this);
    }

    componentDidMount(){
        axios.get(uAPIlocal+'/api/v1/producerlist/'+this.props.id)
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
                    dataProducer: data,
                    loading: false,
                });
                
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    editProducerChange(e) {
        let newdataProducer = { ...this.state.dataProducer };
        newdataProducer[e.target.name] = e.target.value;
        this.setState({
            dataProducer: newdataProducer
        });
    }

    editProducerSubmit(e){
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
                return axios.put(uAPIlocal+'/api/v1/producerlist',{
                    id: this.state.dataProducer.id,
                    producer: this.state.dataProducer.producer,
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
                    text: 'Success edit producer',
                    icon: 'success',
                    allowOutsideClick: false,
                }).then(() => this.setState({ redirect: true }))
            }
        })
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to="/admin/producer" />)
        }
        return (
            <div>
                <section className="content" style={{paddingTop:"20px"}}>
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Edit Producer</h3>
                            </div>
                            <div className="card-body">
                            {
                                this.state.loading ? (
                                    <div className="text-center" >
                                        <Loader type="Bars" color="#00BFFF" height={60} width={100} />
                                        Loading ...
                                    </div>
                                ):(
                                    <form onSubmit={e => this.editProducerSubmit(e)} className="form-horizontal" style={{padding:"10px"}}>
                                        <div className="form-group">
                                            <label>Nama Producer</label>
                                            <input type="text" className="form-control" name="producer" value={this.state.dataProducer.producer} onChange={this.editProducerChange} placeholder="Nama Producer" required/>
                                        </div>
                                        
                                        <div className="form-group">
                                            <div className="col-sm-offset-2 col-sm-10">
                                                <button type="submit" className="btn btn-primary">
                                                    <FontAwesomeIcon icon={faSave}/> Simpan 
                                                </button> <Link to="/admin/producer" className="btn btn-warning" ><FontAwesomeIcon icon={faArrowLeft}/> Batal</Link>
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

export default EditProducer;