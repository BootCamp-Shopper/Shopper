import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';
import Axios from 'axios';
import Login from './Login';
import { Card, CardColumns, Button } from 'react-bootstrap';

export default class Cart extends Component {
    constructor() {
        super();

        this.state = {
            orders: [],
            userInfo: {},
            isLoading: true,
        }
    }

    async componentDidMount() {
        try {
            const user = this.props.user;

            this.props.history.listen((location,action) => {
                this.props.handleClick(document.location.pathname);
            });

            if (Object.keys(user).length !== 0) {
                const member = await fetch(`/api/users/${user.id}`, { method: 'GET' });
                const memberData = await member.json();
                console.log(memberData);
                const { data } = await Axios.get('/api/orders');

                this.setState({
                    orders: data,
                    userInfo: memberData.user,
                    isLoading: false,
                });
            } else {
                this.setState({
                    isLoading: false,
                });
            }
        }
        catch (err) {
            console.error(err.stack);
        }
    }

    handleRemove = async (id) => {
        try {
            const { data } = await Axios.delete(`/api/orders/${id}`);

            let newOrders = this.state.orders.filter(order => order.id !== id);

            this.setState({
                orders: newOrders,
                isLoading: false,
            });
        }
        catch (err) {
            console.error(err);
        }
    }

    render() {
        const { orders, userInfo, isLoading } = this.state;

        if (isLoading) {
            return (
                <div> Loading... </div>
            );
        }
        else if (Object.keys(userInfo).length === 0) {   
            return (
                <Redirect to='/login' component={Login} />
            );
        }
        else if (orders.length === 0) {
            return (
                <div>
                    <h1 style={{ display: 'flex', justifyContent: 'center' }}> You have no superpowers in cart! </h1>
                </div>
            );
        }
        else {
            return (
                <div>
                    <h1 style={{ display: 'flex', justifyContent: 'center' }}> Your Cart </h1>
                    <CardColumns style={{ marginLeft: '5%', marginRight: '5%' }}>
                        {orders.map(order => {
                            return (
                                <Card key={order.id}>
                                    <Card.Img variant="top" src={order.imageUrl} alt='' />
                                    <Card.Body>
                                        <Card.Title><Link to={`/superpowers/${order.id}`}> {order.superhero}'s {order.name} </Link></Card.Title>
                                        <Card.Text>${order.price}.00</Card.Text>
                                        <Button variant="danger" type="button" onClick={() => this.handleRemove(order.id)}> Remove from cart </Button>
                                    </Card.Body>
                                </Card>
                            );
                        })}
                    </CardColumns>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Link to="/payment"> <Button variant="primary" type="button"> checkout </Button> </Link>
                    </div>
                </div>
            );
        }
    }
}