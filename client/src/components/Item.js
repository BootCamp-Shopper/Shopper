import React, { Component } from 'react';
import Axios from 'axios';

export default class Item extends Component {
    constructor() {
        super();

        this.state = {
            item: {},
            isLoading: true,
        }
   }

   async componentDidMount() {
      try {
        const { superpowerId } = this.props.match.params;
        const { data } = await Axios.get(`/api/items/${superpowerId}`);

        this.setState({
            item: data,
            isLoading: false,
        });
      }
      catch(err) {
          console.error(err.stack);
      }
   }
    
   render() {
      const { item, isLoading } = this.state;

      if(isLoading) {
         return (
             <div> Loading... </div>
         );
      }
      else {
         return (
             <div>
                <div> {item.superhero} {item.name} </div>
                <img src={item.imageUrl} alt=""/>
                <div> {item.description} </div>
                <div> {item.price} </div>
             </div>
         );
      }
  }
}