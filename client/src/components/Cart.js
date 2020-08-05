import React, { Component } from "react";
import Axios from 'axios';

export default class Cart extends Component {
    constructor() {
        super();

        this.state = {
           orders: [],
           isLoading: true,
        }
    }

    async componentDidMount() {
       try {
          
       }
       catch(err) {
          console.error(err.stack);
       }
    }

    render() {
      const { orders, isLoading } = this.state;

      if(isLoading) {
          return (
              <div> Loading... </div>
          );
      }
      else if(orders.length === 0) {
          return (
              <div> You have no orders at this time. Head back to the shop to checkout! </div>
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