import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro, faShoppingCart, faThumbsUp, faComment, faUsers, } from '@fortawesome/free-solid-svg-icons';
import Tbl from "../../lib/Datatables";

class Dashboard extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         path: props.location.path
    //     }
    // }
    dataSet = [
        // [ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800" ],
    ];

    dataColums = [
        {title:"No"},
        {title:"ID Pesanan"},
        {title:"Tanggal"},
        {title:"Nama"},
        {title:"Email"},
        {title:"No Hp"},
        {title:"Status"},
        {title:"Aksi"},
    ];
  
    render() {
        return (
            <div>
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">Dashboard</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 col-sm-6 col-md-3" >
                                <Link to="#">
                                    <div className="info-box" >
                                        <span className="info-box-icon bg-info elevation-1">
                                            <FontAwesomeIcon icon={faCameraRetro}/>
                                        </span>
                                        <div className="info-box-content" >
                                            <span className="info-box-text">Product</span>
                                            <span className="info-box-number">1</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="col-12 col-sm-6 col-md-3" >
                                <Link to="#">
                                    <div className="info-box mb-3" >
                                        <span className="info-box-icon bg-success elevation-1">
                                            <FontAwesomeIcon icon={faShoppingCart}/>
                                        </span>

                                        <div className="info-box-content" >
                                            <span className="info-box-text">Pesanan</span>
                                            <span className="info-box-number">1</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="clearfix hidden-md-up" ></div>

                            <div className="col-12 col-sm-6 col-md-3" >
                                <Link to="#">
                                    <div className="info-box mb-3" >
                                        <span className="info-box-icon bg-danger elevation-1">
                                            <FontAwesomeIcon icon={faThumbsUp}/>
                                        </span>

                                        <div className="info-box-content" >
                                            <span className="info-box-text">Konfirmasi Pembayaran</span>
                                            <span className="info-box-number">0</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="col-12 col-sm-6 col-md-3" >
                                <Link to="#">
                                    <div className="info-box mb-3" >
                                        <span className="info-box-icon bg-primary elevation-1">
                                            <FontAwesomeIcon icon={faComment}/>
                                        </span>

                                        <div className="info-box-content" >
                                            <span className="info-box-text">Message</span>
                                            <span className="info-box-number">7</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="clearfix hidden-md-up" ></div>

                            <div className="col-12 col-sm-6 col-md-3" >
                                <Link to="#">
                                    <div className="info-box mb-3" >
                                        <span className="info-box-icon bg-warning elevation-1">
                                            <FontAwesomeIcon icon={faUsers}/>
                                        </span>

                                        <div className="info-box-content" >
                                            <span className="info-box-text">Members</span>
                                            <span className="info-box-number">2</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content">
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Daftar Data Pesanan</h3>
                            </div>
                            <div className="card-body">
                                {/* <Tbl data={this.dataSet} columns={this.dataColums}></Tbl> */}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
export default Dashboard;