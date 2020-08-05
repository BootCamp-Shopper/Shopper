import React, { useState } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const {data} = await Axios.post('/auth/login', {
                email: email,
                password: password,
            });
            console.log(data);
        }
        catch(err) {
            console.error(err);
        }
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bssize="large">
                    <FormLabel>E-mail:</FormLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="password" bssize="large">
                    <FormLabel>Password:</FormLabel>
                    <FormControl
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </FormGroup> 
                <Button block bssize="large" disabled={!validateForm()} type="submit">
                    Login
                </Button>
                <br /><br />
                <div>Not part of superpower community? Join us!</div>
                <Link to="/signup">
                    <Button block bssize="large" type="submit">
                        Sign Up
                    </Button>
                </Link>
            </form>
        </div>
    );
};