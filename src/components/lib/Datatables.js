import React, { Component } from "react";
import "./datatables.min.css";
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2'
import axios from "axios";
import { base64_encode } from "./Func";
import { apiV1, apiV2, clientKey, uAPI } from "./Config";


const $ = require('jquery');
$.Datatable = require('datatables.net-bs4');

class DtTable extends React.Component {
    render() {
        const id = this.props.id;
        return (
            <div className="table-responsive">
                <table id={id} className="table table-striped table-bordered" width="100%" >
                </table>
            </div>
        )
    }
}

class Datatables extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: '',
        }

        this.editAnime = this.editAnime.bind(this);
        this.deleteAnime = this.deleteAnime.bind(this);
        this.editGenre = this.editGenre.bind(this);
        this.deleteGenre = this.deleteGenre.bind(this);
        this.editProducer = this.editProducer.bind(this);
        this.deleteProducer = this.deleteProducer.bind(this);
    }

    editAnime(id) {
        this.setState({
            redirect: '/admin/anime/edit-anime',
            url: '/admin/anime/edit-anime/' + id
        })
    }

    deleteAnime(id, name) {
        // e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: 'Hapus Anime: ' + name,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete!',
            allowOutsideClick: false,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return axios.delete(uAPI + apiV1 + 'animelist/' + id)
                    .catch(function (error) {
                        console.log(error);
                        Swal.fire('Oops...', 'Something went wrong!', 'error');
                    });
            }
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Success delete anime!',
                    icon: 'success',
                    allowOutsideClick: false,
                }).then(() => this.setState({ redirect: '/admin/anime' }))
            }
        })
    }

    editAnimeEpisode(id) {
        this.setState({
            redirect: '/admin/anime-episode/edit-episode',
            url: '/admin/anime-episode/edit-episode/' + id
        })
    }

    deleteAnimeEpisode(id, name) {
        // e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: 'Hapus Episode Anime: ' + name,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete!',
            allowOutsideClick: false,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return axios.delete(uAPI + apiV1 + 'animeepisodelist/' + id)
                    .catch(function (error) {
                        console.log(error);
                        Swal.fire('Oops...', 'Something went wrong!', 'error');
                    });
            }
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Success delete anime!',
                    icon: 'success',
                    allowOutsideClick: false,
                }).then(() => this.setState({ redirect: '/admin/anime-episode' }))
            }
        })
    }

    editGenre(id) {
        this.setState({
            redirect: '/admin/genre/edit-genre',
            url: '/admin/genre/edit-genre/' + id
        })
    }

    deleteGenre(id, name) {
        // e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: 'Hapus Genre: ' + name,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete!',
            allowOutsideClick: false,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return axios.delete(uAPI + apiV1 + 'genrelist/' + id)
                    .catch(function (error) {
                        console.log(error);
                        Swal.fire('Oops...', 'Something went wrong!', 'error');
                    });
            }
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Success delete genre!',
                    icon: 'success',
                    allowOutsideClick: false,
                }).then(() => this.setState({ redirect: '/admin/genre' }))
            }
        })
    }

    editProducer(id) {
        this.setState({
            redirect: '/admin/producer/edit-producer',
            url: '/admin/producer/edit-producer/' + id
        })
    }

    deleteProducer(id, name) {
        // e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: 'Hapus Producer: ' + name,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete!',
            allowOutsideClick: false,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return axios.delete(uAPI + apiV1 + 'producerlist/' + id)
                    .catch(function (error) {
                        console.log(error);
                        Swal.fire('Oops...', 'Something went wrong!', 'error');
                    });
            }
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Success delete producer!',
                    icon: 'success',
                    allowOutsideClick: false,
                }).then(() => this.setState({ redirect: '/admin/producer' }))
            }
        })
    }

    componentDidMount() {
        $('#animeepisodelist').DataTable({
            order: [[0, "desc"]],
            processing: true,
            serverSide: true,
            deferRender: true,
            ajax: {
                url: uAPI + "/api/v1/dt/animeepisodelist",
                type: 'POST'
            },
            columns: [
                // {title:"No", width:"50px", orderable: false},
                { title: "Title" },
                { title: "Published", orderable: false },
                { title: "Aksi", width: "150px", orderable: false },
            ],
            columnDefs: [{
                targets: -1,
                createdCell: (td, cellData, rowData, row, col) =>
                    ReactDOM.render(
                        <BrowserRouter>
                            {/* {console.log('cellData: '+cellData)}
                        {console.log('rowData: '+rowData)}
                        {console.log('row: '+row)}
                        {console.log('col: '+col)} */}
                            <button type="button" className="btn btn-primary btn-sm" onClick={() => this.editAnimeEpisode(rowData[2])}> <FontAwesomeIcon icon={faEdit} /> Edit</button> <button type="button" className="btn btn-danger btn-sm" onClick={() => this.deleteAnimeEpisode(rowData[2], rowData[0])}> <FontAwesomeIcon icon={faTrash} /> Delete</button>
                        </BrowserRouter>, td),
            }]
        });

        $('#animelist').DataTable({
            order: [[0, "desc"]],
            processing: true,
            serverSide: true,
            deferRender: true,
            ajax: {
                headers: {
                    'Authorization': `Bearer ${base64_encode(clientKey)}`
                },
                url: uAPI + apiV2 + "dt/animelist",
                type: 'POST',
                // success: function (accessToken) {
                //     // console.log(accessToken);
                //     $.ajax({
                //         headers: {
                //             'Authorization': `Bearer ${base64_encode(accessToken)}`
                //         },
                //         url: uAPI + apiV2 + "dt/animelist",
                //         type: 'POST',
                //         dataSrc: function (json) {
                //             console.log(json)
                //             return json.data;
                //         }
                //     })
                // },
            },
            columns: [
                // {title:"No", width:"50px", orderable: false},
                { title: "Title" },
                { title: "Published", orderable: false },
                { title: "Aksi", width: "150px", orderable: false },
            ],
            columnDefs: [{
                targets: -1,
                createdCell: (td, cellData, rowData, row, col) =>
                    ReactDOM.render(
                        <BrowserRouter>
                            {/* {console.log('cellData: ' + cellData)}
                            {console.log('rowData: ' + rowData)}
                            {console.log('row: ' + row)}
                            {console.log('col: ' + col)} */}
                            <button type="button" className="btn btn-primary btn-sm" onClick={() => this.editAnime(rowData[2])}> <FontAwesomeIcon icon={faEdit} /> Edit</button> <button type="button" className="btn btn-danger btn-sm" onClick={() => this.deleteAnime(rowData[2], rowData[0])}> <FontAwesomeIcon icon={faTrash} /> Delete</button>
                        </BrowserRouter>, td),
            }]
        });

        $('#genrelist').DataTable({
            order: [[0, "desc"]],
            processing: true,
            serverSide: true,
            deferRender: true,
            ajax: {
                url: uAPI + "/api/v1/dt/genrelist",
                type: 'POST'
            },
            columns: [
                // {title:"No", width:"50px", orderable: false},
                { title: "Nama Genre" },
                { title: "Aksi", width: "150px", orderable: false },
            ],
            columnDefs: [{
                targets: -1,
                createdCell: (td, cellData, rowData, row, col) =>
                    ReactDOM.render(
                        <BrowserRouter>
                            {/* {console.log('cellData: '+cellData)}
                        {console.log('rowData: '+rowData)}
                        {console.log('row: '+row)}
                        {console.log('col: '+col)} */}
                            <button type="button" className="btn btn-primary btn-sm" onClick={() => this.editGenre(rowData[1])}> <FontAwesomeIcon icon={faEdit} /> Edit</button> <button type="button" className="btn btn-danger btn-sm" onClick={() => this.deleteGenre(rowData[1], rowData[0])}> <FontAwesomeIcon icon={faTrash} /> Delete</button>
                        </BrowserRouter>, td),
            }]
        });

        $('#producerlist').DataTable({
            order: [[0, "desc"]],
            processing: true,
            serverSide: true,
            deferRender: true,
            ajax: {
                url: uAPI + "/api/v1/dt/producerlist",
                type: 'POST'
            },
            columns: [
                // {title:"No", width:"50px"},
                { title: "Nama Producer" },
                { title: "Aksi", width: "150px", orderable: false },
            ],
            columnDefs: [{
                targets: -1,
                createdCell: (td, cellData, rowData, row, col) =>
                    ReactDOM.render(
                        <BrowserRouter>
                            {/* {console.log('cellData: '+cellData)}
                        {console.log('rowData: '+rowData)}
                        {console.log('row: '+row)}
                        {console.log('col: '+col)} */}
                            <button type="button" className="btn btn-primary btn-sm" onClick={() => this.editProducer(rowData[1])}> <FontAwesomeIcon icon={faEdit} /> Edit</button> <button type="button" className="btn btn-danger btn-sm" onClick={() => this.deleteProducer(rowData[1], rowData[0])}> <FontAwesomeIcon icon={faTrash} /> Delete</button>
                        </BrowserRouter>, td),
            }]
        });


    }

    render() {
        if (this.state.redirect === '/admin/anime') {
            return (
                <Route path='/admin/anime'>
                    <Datatables id='animelist' />
                </Route>
            )
        } else if (this.state.redirect === '/admin/anime/edit-anime') {
            return (<Redirect to={this.state.url} />)
        } else if (this.state.redirect === '/admin/anime-episode') {
            return (
                <Route path='/admin/anime-episode'>
                    <Datatables id='animeepisodelist' />
                </Route>
            )
        } else if (this.state.redirect === '/admin/anime-episode/edit-episode') {
            return (<Redirect to={this.state.url} />)
        } else if (this.state.redirect === '/admin/genre') {
            return (
                <Route path='/admin/genre'>
                    <Datatables id='genrelist' />
                </Route>
            )
        } else if (this.state.redirect === '/admin/genre/edit-genre') {
            return (<Redirect to={this.state.url} />)
        } else if (this.state.redirect === '/admin/producer') {
            return (
                <Route path='/admin/producer'>
                    <Datatables id='producerlist' />
                </Route>
            )
        } else if (this.state.redirect === '/admin/producer/edit-producer') {
            return (<Redirect to={this.state.url} />)
        }
        return (
            <DtTable id={this.props.id} />
        )
    }

}

export default Datatables;
