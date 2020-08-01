import React, {Component} from 'react';
import axios from 'axios';
import SignupForm from './SignupForm';

export default class Signup extends Component{
    constructor(){
        super()
        this.handleSubmit = this.handleSubmit.bind(this) //binding the context of the class to remember the function's use when passed to props
    }

    async handleSubmit(event){
        //prevent reloading of page onClick
        event.preventDefault()

        //variables containing user's input values
        const email = event.target.email.value;
        const name = event.target.name.value;
        const password = event.target.password.value;
        const address = event.target.address.value;
        const imageUrl = event.target.imageUrl.value;

        //send data to server; to be sent to db
        let res;

        try {
            res = await axios.post('/auth/signup', {email, name, password, address, imageUrl})

        } catch (error) {
            console.error(error)
        }
        
        
    }

    render(){
        return (
            <div>
                <SignupForm handleSubmit={this.handleSubmit}/>
            </div>
        )
    }

}