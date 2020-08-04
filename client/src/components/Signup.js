import React, { Component } from 'react';
import axios from 'axios';
import SignupForm from './SignupForm';

export default class Signup extends Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this) 
        //binding the context of the class to remember the function's use when passed to props
    }

    async handleSubmit(event) {
        //prevent reloading of page onClick
        event.preventDefault()

        //variables containing user's input values
        
        const userDetails = {
            email: event.target.email.value,
            password: event.target.password.value,
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            imageUrl: event.target.imageUrl.value
        }

        const userAddress = {
            line1: event.target.line1.value,
            line2: event.target.line2.value,
            city: event.target.city.value,
            state: event.target.state.value,
            zip: event.target.zip.value
        }

        // variables containing address' input values
        const line1 = event.target.line1.value;
        const line2 = event.target.line2.value;
        const city = event.target.city.value;
        const state = event.target.state.value;
        const zip = event.target.zip.value;

        //send data to server; to be sent to db
        try {
            const {data} = await axios.post('/auth/signup', {userAddress, userDetails})
            
            if (typeof data === 'string'){
                window.alert(data)
            }

            else{
                this.props.history.push({
                    pathname: `/users/${data.id}`
                })
            }
        } catch (error) {
            console.error(error)
        }
    }

    render() {
        const headerStyle = {
            textAlign: 'center',
            padding: '1%'
        }

        return (
            <div>
                <h1 style={headerStyle}>Signup Form</h1>
                <SignupForm handleSubmit={this.handleSubmit} />
            </div>
        )
    }

}