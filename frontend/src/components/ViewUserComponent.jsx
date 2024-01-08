import React, { Component } from "react";
import UserService from "../services/UserService";

class ViewUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      user: {},
    };
  }

  componentDidMount() {
    UserService.GetItem(this.state.id).then((res) => {  
      this.setState({ user: res.data });
    });
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="card col-md-6 offset-md-3">
          <h3 className="text-center">View Barang</h3>
          <div className="card-body">
          <div className = "row" style={{ backgroundImage: `url("/bg2.jpg")` }}>
              <label> nama_barang: </label>
              <div> {this.state.user.nama_barang}</div>
            </div>
            <div className="row">
              <label> jumlah: </label>
              <div> {this.state.user.jumlah}</div>
            </div>
            <div className="row">
              <label> harga_satuan: </label>
              <div> {this.state.user.harga_satuan}</div>
            </div>
            <div className="row">
              <label> lokasi: </label>
              <div> {this.state.user.lokasi}</div>
            </div>
            <div className="row">
              <label> deskripsi: </label>
              <div> {this.state.user.deskripsi}</div>
            </div>
      
            </div>
          </div>
        </div>
      
    );
  }
}

export default ViewUserComponent;