import React, { useState, useEffect } from 'react';
import API from '../../API/api';

import { useParams, Link } from 'react-router-dom';

import { Card, Button, Alert } from 'react-bootstrap';

const StateOrder = () => {

    const { id } = useParams();

    const [detail, setdetail] = useState({});

    const DetailOrder = async () => {
        try {
            const { data } = await API.get(`/resume-status-order/${id}`);
            if (data.total > 0) {
                setdetail(data.detail);
            }
        } catch (error) {
            console.warn(error);
        }
    };

    useEffect(() => {
        DetailOrder();
    }, [])

    const GoToPay = async () => {

        try {
            let datos = {
                reference: id,
                description: 'Test payment',
                currency: 'COP',
                total: 11000
            };

            const { data } = await API.post(`/create-payment-order`, datos);

            if (data?.processUrl) {
                window.open(data.processUrl, '_blank');
            } else {
                alert(data.data.status.message);

            }

            setTimeout(function () {
                InfoTransAction(data);
            }, 60 * 1000 * 5);

        } catch (error) {
            console.warn(error);
        }
    }

    const InfoTransAction = async ({ requestId }) => {
        try {
            let datos = {
                requestId: requestId,
            };
            const { data } = await API.post(`/info-transaction`, datos);
            
        } catch (error) {
            console.warn(error);
        }
    }

    return (
        <div>
            {
                detail?.status === 'PAYED' ?
                    <div>
                        <Alert className="m-5 w-75 justify-content-center" variant="success">
                            <Alert.Heading>Order #: <b>{id}</b></Alert.Heading>
                            <hr />
                            <p className="mb-0">
                                <b><h4>PAYED SUCCESSFUL...</h4></b>
                            </p>
                        </Alert>
                    </div>
                    :
                    <div>
                        <Card className="m-5 w-50">
                            <Card.Header className="h4">Resume Order</Card.Header>
                            <Card.Body>
                                <Card.Title>Order #: <b>{id}</b></Card.Title>
                                <Card.Text>
                                    Customer Name: <b>{detail.customer_name}</b>
                                </Card.Text>
                                <Card.Text>
                                    Customer Email: <b>{detail.customer_email}</b>
                                </Card.Text>
                                <Card.Text>
                                    Customer Mobile: <b>{detail.customer_mobile}</b>
                                </Card.Text>
                                <Card.Text>
                                    Total: <b>11000,00 COP</b>
                                </Card.Text>
                                <Card.Text>
                                    Status: <h1>{detail.status}.</h1>
                                </Card.Text>
                                {detail.status == 'CREATED' ?
                                    <Button
                                        variant="success"
                                        onClick={GoToPay}
                                    >Go To Pay</Button>
                                    :
                                    <Button
                                        variant="warning"
                                        onClick={GoToPay}
                                    >Try Again
                                    </Button>
                                }
                            </Card.Body>
                        </Card>
                    </div>
            }
            <Link to="/list-order"><h5 className="my-3 ml-5 btn btn-primary">Back to orders</h5></Link>
        </div>
    )
}

export default StateOrder;