import React, { Component } from "react";
import "./datatables.min.css";
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2'
import axios from "axios";


const $ = require('jquery');
$.Datatable = require('datatables.net-bs4');

const uAPIlocal = 'http://'+window.location.hostname+':8080';

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
       
        this.editGenre = this.editGenre.bind(this);
        this.deleteGenre = this.deleteGenre.bind(this);
        this.editProducer = this.editProducer.bind(this);
        this.deleteProducer = this.deleteProducer.bind(this);
    }

    editGenre(id){
        this.setState({ 
            redirect: '/admin/genre/edit-genre',
            url: '/admin/genre/edit-genre/'+id
        })
    }

    deleteGenre(id, name){
        // e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: 'Hapus Genre: '+name,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete!',
            allowOutsideClick: false,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return axios.delete(uAPIlocal+'/api/v1/genrelist/'+id)
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

    editProducer(id){
        this.setState({ 
            redirect: '/admin/producer/edit-producer',
            url: '/admin/producer/edit-producer/'+id
        })
    }

    deleteProducer(id, name){
        // e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: 'Hapus Producer: '+name,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete!',
            allowOutsideClick: false,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return axios.delete(uAPIlocal+'/api/v1/producerlist/'+id)
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
        $('#genrelist').DataTable( {
            order: [[ 0, "desc" ]],
            ajax: uAPIlocal+"/api/v1/dt/genrelist",
            columns: [
                {title:"No", width:"50px"},
                {title:"Nama Genre"},
                {title:"Aksi", width:"150px"},
            ],
            columnDefs: [ {
                targets: -1,
                createdCell: (td, cellData, rowData, row, col) =>
                    ReactDOM.render(
                        <BrowserRouter>
                        {/* {console.log('cellData: '+cellData)}
                        {console.log('rowData: '+rowData)}
                        {console.log('row: '+row)}
                        {console.log('col: '+col)} */}
                        <button type="button"  className="btn btn-primary btn-sm" onClick={() => this.editGenre(rowData[2])}> <FontAwesomeIcon icon={faEdit}/> Edit</button> <button type="button"  className="btn btn-danger btn-sm" onClick={() => this.deleteGenre(rowData[2], rowData[1])}> <FontAwesomeIcon icon={faTrash}/> Delete</button>
                        </BrowserRouter>, td),
            } ]
        } );

        $('#producerlist').DataTable( {
            order: [[ 0, "desc" ]],
            ajax: uAPIlocal+"/api/v1/dt/producerlist",
            columns: [
                {title:"No", width:"50px"},
                {title:"Nama Producer"},
                {title:"Aksi", width:"150px"},
            ],
            columnDefs: [ {
                targets: -1,
                createdCell: (td, cellData, rowData, row, col) =>
                    ReactDOM.render(
                        <BrowserRouter>
                        {/* {console.log('cellData: '+cellData)}
                        {console.log('rowData: '+rowData)}
                        {console.log('row: '+row)}
                        {console.log('col: '+col)} */}
                        <button type="button"  className="btn btn-primary btn-sm" onClick={() => this.editProducer(rowData[2])}> <FontAwesomeIcon icon={faEdit}/> Edit</button> <button type="button"  className="btn btn-danger btn-sm" onClick={() => this.deleteProducer(rowData[2], rowData[1])}> <FontAwesomeIcon icon={faTrash}/> Delete</button>
                        </BrowserRouter>, td),
            } ]
        } );
        
     
    }

    render() {
        if (this.state.redirect === '/admin/genre') { //redirect setelah delete bank
            return (
                <Route path='/admin/genre'>
                    <Datatables id='genrelist'/>
                </Route>
            )
        } else if (this.state.redirect === '/admin/genre/edit-genre'){
            return (<Redirect to={this.state.url}/>)
        } else if (this.state.redirect === '/admin/producer') { //redirect setelah delete bank
            return (
                <Route path='/admin/producer'>
                    <Datatables id='producerlist'/>
                </Route>
            )
        } else if (this.state.redirect === '/admin/producer/edit-producer'){
            return (<Redirect to={this.state.url}/>)
        } 
        return (
            <DtTable id={this.props.id}/>
        )
    }

}

export default Datatables;
