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
        const email = event.target.email.value;
        const password = event.target.password.value;
        const firstName = event.target.firstName.value;
        const lastName = event.target.lastName.value;
        const imageUrl = event.target.imageUrl.value;

        // variables containing address' input values
        const line1 = event.target.line1.value;
        const line2 = event.target.line2.value;
        const city = event.target.city.value;
        const state = event.target.state.value;
        const zip = event.target.zip.value;

        //send data to server; to be sent to db
        try {
            const {data} = await axios.post('/auth/signup', {
                email, firstName, lastName, password, imageUrl,
                line1, line2, city, state, zip,
            })
            console.log(data);

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