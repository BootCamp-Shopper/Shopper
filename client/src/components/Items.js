import React, { Component } from "react";
import Axios from 'axios';

export default class Items extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
            loading: true,
        };
    }

    async componentDidMount() {
        try {
            const response = await fetch("/api/items", { method: "GET" });
            const itemsData = await response.json();
 
            this.setState({
                items: itemsData,
                loading: false,
            });
        } catch (err) {
            console.error("ERROR: ", err);
        }
    }

    handleSubmit = evt => {
        evt.preventDefault();

        Axios.post('/api/items/', {
           name: evt.target.name.value,
           superhero: evt.target.superhero.value,
           imageUrl: evt.target.imageUrl.value,
           price: evt.target.price.value,
           description: evt.target.description.value,
        })
        .then(res => {
            // insert the new item at the beginning of the items array
            const { items } = this.state;
            items.unshift(res.data);
            
            // reset the forms fields on submit
            document.getElementById('new-item').reset();

            // re-render state to display updated array
            this.setState({
               items: items,
               loading: false,
            });
         })
        .catch(err => {
            console.error(err.stack);
        });
    }

    render() {
        const { items, loading } = this.state;
        if (loading) {
            return <div>Loading...</div>;
        }
        if (items.length === 0) {
            return <div>No items found!</div>;
        }

        return (
            <div>
                <div className="items-form">
                   <h1> Add a new item </h1>
                   <form id="new-item" onSubmit={evt => this.handleSubmit(evt)}>
                      <div>
                         <label htmlFor="name"> Name: </label>
                         <input name="name" type="text" />
                      </div>
                      <div>
                         <label htmlFor="superhero"> Superhero: </label>
                         <input name="superhero" type="text"/>
                      </div>
                      <div>
                         <label htmlFor="imageUrl"> Image URL: </label>
                         <input name="imageUrl" type="url"/>
                      </div>
                      <div>
                         <label htmlFor="price"> Price: $</label>
                         <input name="price" type="number"/>
                      </div>
                      <div>
                         <label htmlFor="description"> Description: </label>
                         <div>
                           <textarea name="description" type="text"/>
                         </div>
                      </div>
                      <div>
                         <button type="submit"> Submit </button>
                      </div>
                   </form>
                </div>
                <hr />
                <div>
                    {items.map(item => {
                        return (
                            <div key={item.id}>
                                <div>{item.superhero}'s {item.name}</div>
                                <img src={item.imageUrl} alt={item.name} />
                                <div>{item.description}</div>
                                <div>{item.price}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    };
};

