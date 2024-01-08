import React, { Component } from 'react'
import UserService from '../services/UserService'
import Swal from "sweetalert2"

class ListUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                users: [],
                searchTerm: '',
        }
        this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    deleteUser(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will delete it',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                UserService.DeleteItem(id).then((res) => {
                    this.setState({
                        users: this.state.users.filter((user) => user.id !== id),
                    });
                    Swal.fire('Deleted!', 'User has been deleted.', 'success');
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'User deletion cancelled :)', 'error');
            }
        });
    }

    viewUser(id){
        this.props.history.push(`/view-user/${id}`);
    }
    editUser(id){
        this.props.history.push(`/add-user/${id}`);
    }

    componentDidMount(){
        UserService.GetItems().then((res) => {
            if(res.data==null)
            {
                this.props.history.push('/add-user/_add');
            }
            this.setState({ users: res.data});
        });
    }

    addUser(){
        this.props.history.push('/add-user/_add');
    }

    handleSearchChange(event) {
        this.setState({ searchTerm: event.target.value });
    }

    getFilteredUsers() {
        const { users, searchTerm } = this.state;

        return users.filter(
            (user) =>
                user.nama_barang.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">
                     Users List</h2>
                     <div className = "row justify-content-between" style={{ backgroundImage: `url("/bg2.jpg")` }}>
                    <button className="btn btn-primary"
                     onClick={this.addUser}> Add Inventory</button>
                     <input
                        type="text"
                        placeholder="search by nama barang"
                        value={this.state.searchTerm}
                        title="search by nama barang"
                        onChange={(e) => this.handleSearchChange(e)}
                        style={{ fontStyle: 'italic' }}
                    />
                 </div>
                 <br></br>
                 <div className = "row" style={{ backgroundImage: `url("/bg2.jpg")` }}>
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>NAMA BARANG</th>
                                    <th>JUMLAH</th>
                                    <th>HARGA SATUAN</th>
                                    <th>LOKASI</th>
                                    <th>DESKRIPSI</th>
                                    <th>actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.getFilteredUsers().map((user) => (
                                <tr key={user.id}>
                                            <td>
                                                {user.nama_barang}
                                            </td>
                                            <td>
                                                {user.jumlah}
                                            </td>
                                            <td>
                                                {user.harga_satuan}
                                            </td>
                                            <td>
                                                {user.lokasi}
                                            </td>
                                                {user.deskripsi}
                                             <td>
                                                <button onClick={ () => 
                                                    this.editUser(user.id)} 
                                                        className="btn btn-info">Update 
                                                            </button>
                                                <button style={{marginLeft: "10px"}}
                                                    onClick={ () => this.deleteUser(user.id)} 
                                                        className="btn btn-danger">Delete 
                                                            </button>
                                                <button style={{marginLeft: "10px"}} 
                                                    onClick={ () => this.viewUser(user.id)}
                                                        className="btn btn-info">View 
                                                </button>
                                    </td>
                                        </tr>
                                ))}
                            </tbody>
                        </table>
                 </div>
            </div>
        )
    }
}

export default ListUserComponent;
