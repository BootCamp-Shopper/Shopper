import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Axios from 'axios'; 
import { Card, CardColumns, Button, Form } from 'react-bootstrap';

const style = {
    position: 'relative',
    padding: '1rem',
    border: '.2rem solid #ececec',
    borderRadius: '8px',
    marginRight: '5%',
    marginLeft: '5%',
    color: '#212529'
}


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
                   <Form id="new-item" onSubmit={evt => this.handleSubmit(evt)} style={style}>
                      <Form.Group>
                         <Form.Label>Name</Form.Label>
                         <Form.Control name="name" type="text" placeholder="Enter superpower name."/>
                      </Form.Group>
                      <Form.Group>
                         <Form.Label>Superhero</Form.Label>
                         <Form.Control name="superhero" type="text" placeholder="Owner of superpower."/>
                      </Form.Group>
                      <Form.Group>
                         <Form.Label>Image URL</Form.Label>
                         <Form.Control name="imageUrl" type="url" placeholder="Please provide direct image link."/>
                      </Form.Group>
                      <Form.Group>
                         <Form.Label>Price</Form.Label>
                         <Form.Control name="price" type="number" placeholder="Cost of item"/>
                      </Form.Group>
                      <Form.Group>
                         <Form.Label> Description </Form.Label>
                         <Form.Control as='textarea' rows="2" name="description" type="text" placeholder="Include small description of power here."/>
                      </Form.Group>
                      
                      <Button variant="primary" type="submit">
                           Submit
                      </Button>
                      
                   </Form>
                
                </div>
               
                <br />
                <hr />
                <br />
            
                <CardColumns>
                    {items.map(item => {
                        return (
                            
                                <Card key={item.id}>
                                    <Card.Img variant="top" src={item.imageUrl} alt={item.name} />
                                    <Card.Body>
                                    <Card.Title><Link to={`/superpowers/${item.id}`}> {item.superhero}'s {item.name} </Link></Card.Title>
                                    <Card.Text>${item.price}.00</Card.Text>
                                    <Button variant='primary' type='button' value="Add to cart" status="pending" itemID={item.id} onClick={(evt) => this.addOrder(evt)} style={{marginRight: '3%'}}>Add To Cart</Button>
                                    <Button variant='danger' type='button' onClick={() => {this.handleClick(item.id)}}>Delete Item</Button>
                                    </Card.Body>
                                </Card>
                        )
                    })}
                </CardColumns>
            </div>
        );
    };
};

