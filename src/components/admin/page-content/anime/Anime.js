import React, { Component } from "react";
import { Link } from "react-router-dom";
import Tbl from "../../../lib/Datatables";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class Anime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tbl: this.props.tbl,
        }
    }
    render() {
        return (
            <div>
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">Anime</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="content">
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Daftar Data Anime</h3>

                                <Link to="/admin/anime/add-anime" className="btn btn-primary btn-icon-split" style={{ float:"right", marginRight:"4px"}}>
                                    <span className="icon text-white-50">
                                        <FontAwesomeIcon icon={faPlus}/>
                                    </span>
                                    <span className="text">Tambah</span>
                                </Link>
                            </div>
                            
                            <div className="card-body">
                                <Tbl id={this.state.tbl}></Tbl>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
export default Anime;