import React from 'react';
import GenerateOrder from '../Pages/GenerateOrder';
import StateOrder from '../Pages/ResumeStateOrder';
import ListOrder from '../Pages/ListOrder';
import AllOrder from '../Pages/AllOrders';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import { Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function Navegation() {
    return (
        <Router>
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="/list-order"><h3>Orders</h3></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/new-order">New Order</Nav.Link>
                            <Nav.Link href="/list-order">My Orders</Nav.Link>
                            <Nav.Link href="/all-order">All Orders</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Switch>
                    <Route
                        exact
                        path="/new-order"
                    >
                        <GenerateOrder />
                    </Route>

                    <Route
                        exact
                        path="/resume-status-order/:id"
                        component={StateOrder}
                    >
                    </Route>
                    <Route
                        exact
                        path="/list-order">
                        <ListOrder />
                    </Route>

                    <Route
                        exact
                        path="/all-order">
                        <AllOrder />
                    </Route>

                    <Route 
                        exact 
                        path="/">
                        <Redirect to="/list-order" />
                    </Route>

                </Switch>
            </div>
        </Router>
    );
}

export default Navegation;