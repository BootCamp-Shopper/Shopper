import React, { useState } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios';
import Items from './Items';

export default function Login(props) {
    const { handleClick } = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [items, setItems] = useState([]);

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const { data } = await Axios.post('/auth/login', {
                email: email,
                password: password,
            });
            if (Array.isArray(data)) {
                setItems(data);
            }
            else if (data === 'Login failed') {
                window.alert(data)
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    if (items.length > 0) {
        return <Redirect to='/superpowers' component={Items} />
    } else {
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
                    <Button block bssize="large" disabled={!validateForm()} type="submit" onClick={() => handleClick('/superpowers')}>
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
    }
};