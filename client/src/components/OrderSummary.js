import React, { Component } from 'react';
import Axios from 'axios';
import { ListGroup } from 'react-bootstrap';

export default class OrderSummary extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
            isLoading: true,
        };
    };

    async componentDidMount() {
        try {
            const { data } = await Axios.get('/api/orders');
            this.setState({
                items: data,
                isLoading: false,
            });
        } catch (err) {
            console.error(err);
        }
    };

    render() {
        const { items, isLoading } = this.state;

        if (isLoading) {
            return (
                <div>Your items are being prepared...</div>
            )
        } else {
            return (
                <div>
                    <h3> Order Summary </h3>
                    <hr />
                    <div>
                        {items.map(item => {
                            return (
                                <ListGroup horizontal='md' key={item.id}>
                                    <img src={item.imageUrl} alt={item.name} style={{width: '200px', height: '100px'}}/>
                                    <ListGroup.Item>{item.name}</ListGroup.Item>
                                    <ListGroup.Item>{item.price}</ListGroup.Item>
                                </ListGroup>
                            )
                        })}
                    </div>
                </div>
            );
        }
    };
};