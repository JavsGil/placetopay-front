import React, { useState } from 'react';
import API from '../../API/api';

import { Link, useHistory } from 'react-router-dom';


const GenerateOrder = () => {

    const [values, setValues] = useState({
        customer_name: '',
        customer_email: '',
        customer_mobile: '',
        status: 'CREATED'
    });

    let history = useHistory();

    const handleInputChange = (event) => {
        try {
            const { name, value } = event.target;
            setValues({ ...values, [name]: value });
        } catch (e) {
            console.warn(e);
        }
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault(); 
            const { data } = await API.post(`/create-order`, values);
            if (data?.id) {
                alert(`Order number ${data.id} was created.`);
                history.push("/list-order");
            }
        } catch (error) {
            console.warn(error);
        }
    }
    return (
        <div className="App">
            <header className="App-header">
                <div className="container m-4 col-4">
                    <div className="card card-group opacidad">
                        <div className="card-header card-img text-center">
                            New Order
                     </div>
                        <div className="container-fluid">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label><h5>Customer name</h5></label>
                                    <input
                                        type="text"
                                        name="customer_name"
                                        className="form-control"
                                        onChange={handleInputChange}
                                        autoComplete="off"
                                        placeholder="Enter your Name"
                                    />
                                </div>

                                <div className="form-group">
                                    <label><h5>Customer Email</h5></label>
                                    <input
                                        type="email"
                                        name="customer_email"
                                        className="form-control"
                                        onChange={handleInputChange}
                                        autoComplete="off"
                                        placeholder="Enter your email"
                                    />
                                </div>

                                <div className="form-group">
                                    <label><h5>Customer Mobile</h5></label>
                                    <input
                                        type="text"
                                        name="customer_mobile"
                                        className="form-control"
                                        onChange={handleInputChange}
                                        autoComplete="off"
                                        placeholder="Enter your Mobile"
                                    />
                                </div>

                                <div className="button-loggin">
                                    <button type="submit" className="btn btn-success">create</button>
                                </div>
                                    <Link to="/list-order" className="App-link"><h5 className="my-3 btn btn-primary">View Orders</h5></Link>
                            </form>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );

}

export default GenerateOrder;

