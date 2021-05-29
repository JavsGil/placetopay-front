import React, { useState, useEffect } from 'react';
import API from '../../API/api';

import { Link } from 'react-router-dom';

import { Table } from 'react-bootstrap';


const ListOrder = () => {

    const [list, setList] = useState([]);
    
    const allOrders = async () => {
        try {
            const { data } = await API.get(`/client-resume-order`);
            if (data.length > 0) {
                setList(data);
            }
        } catch (error) {
            console.warn(error);
        }
    };

    useEffect(() => {
        allOrders();
    }, []);

    return (
        <div>
            <div className="container">
            <Link to="/new-order" className="App-link"><h5 className="my-3 btn btn-success">New Orders</h5></Link>
                <div className="row my-4 d-flex justify-content-start">
                    <div className="col-12">
                        <h2>My Orders</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer Name</th>
                                    <th>Status</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            {
                                list.map((item, i) => (
                                    <tbody key={i}>
                                        <tr>
                                            <td>{item.id}</td>
                                            <td>{item.customer_name}</td>
                                            <td>{item.status}</td>
                                            <td>{<Link className="btn btn-primary" to={`/resume-status-order/${item.id}`} >View</Link>}</td>
                                        </tr>
                                    </tbody>
                                ))
                            }
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListOrder;
