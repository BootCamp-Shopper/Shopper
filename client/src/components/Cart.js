import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import Login from './Login';

export default class Cart extends Component {
    constructor() {
        super();

        this.state = {
            orders: [],
            isLoggedIn: false,
            isLoading: true,
        }
    }

    async componentDidMount() {
        try {
            const { data } = await Axios.get('/api/orders');
            console.log(data);

            if (typeof (data) === 'string') {
                this.setState({
                    isLoggedIn: false,
                    isLoading: false,
                });
            } else {
                this.setState({
                    orders: data,
                    isLoggedIn: true,
                    isLoading: false,
                });
            }
        }
        catch (err) {
            console.error(err.stack);
        }
    }

    render() {
        const { orders, isLoggedIn, isLoading } = this.state;

        if (isLoading) {
            return (
                <div> Loading... </div>
            );
        }
        else if (isLoggedIn === false) {
            return (
                <Redirect to='/login' component={Login} />
            );
        }
        else {
            return (
                <div>
                    <h1> Your Cart </h1>
                </div>
            );
        }
    }
}