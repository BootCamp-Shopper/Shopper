import React, { Component } from "react";
import { Link } from 'react-router-dom';
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

    //Delete button functionality for items
    async handleClick (id, evt) {
        try {
            const {status} = await Axios.delete(`/api/items/${id}`) //route listing
            if (status === 200) {
                //creates the new item list without the deleted item; filter is called to return list of items barring whichever item was flagged as deleted; react re-renders page immediately when state changes
                const newItemList = this.state.items.filter(item => item.id !== id)
                this.setState({
                    items: newItemList
                })
            }        
        } 
        catch (error) {
            console.error(error)
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

    addOrder = evt => {
        Axios.post('/api/orders/add', {
            status: evt.target.getAttribute('status'),
            superheroId: evt.target.getAttribute('itemID'),
        })
        .then((res) => {
           console.log('Item added to cart!', res.data);
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
                   <form id="new-item" onSubmit={evt => this.handleSubmit(evt)}>
                      <div>
                         <label htmlFor="name"> Name: </label>
                         <div> <input name="name" type="text" placeholder="superpower"/> </div>
                      </div>
                      <div>
                         <label htmlFor="superhero"> Superhero: </label>
                         <div> <input name="superhero" type="text" placeholder="superhero name"/> </div>
                      </div>
                      <div>
                         <label htmlFor="imageUrl"> Image URL: </label>
                         <div> <input name="imageUrl" type="url" placeholder="Direct image link"/> </div>
                      </div>
                      <div>
                         <label htmlFor="price"> Price: $</label>
                         <div> <input name="price" type="number" placeholder="Cost of item"/> </div>
                      </div>
                      <div>
                         <label htmlFor="description"> Description: </label>
                         <div>
                           <textarea style={{width:"30%"}} name="description" type="text" placeholder="Description of superpower"/>
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
                                <img src={item.imageUrl} alt={item.name} />
                                <div> <Link to={`/superpowers/${item.id}`}> {item.superhero}'s {item.name} </Link> </div>
                                <div>${item.price}</div>
                                <button onClick={() => {this.handleClick(item.id)}}>Delete</button>
                                <div>
                                   <input type="submit" value="Add to cart" status="pending" itemID={item.id} onClick={(evt) => this.addOrder(evt)} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    };
};

