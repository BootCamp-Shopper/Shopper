import React, {Component} from 'react';
import axios from 'axios';

export default class Signup extends Component{
    constructor(){
        super()
    }

    async handleSubmit(event){
        //prevent reloading of page onClick
        event.preventDefault()

        //variables containing user's input values
        const email = event.target.email.value;
        const username = event.target.username.value;
        const password = event.target.password.value;
        const address = event.target.address.value;
        const imageUrl = event.target.imageUrl.value;

        //send data to server; to be sent to db
        let res;

        try {
            res = await axios.post('/auth/signup', {email, username, password, address, imageUrl})

        } catch (error) {
            console.error(error)
        }
        
        


    }

}