import React from 'react';
import { Button, Form } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';


const style = {
        position: 'relative',
        padding: '1rem',
        border: '.2rem solid #ececec',
        borderRadius: '8px',
        marginRight: '5%',
        marginLeft: '5%',
        color: '#212529'
    }

function SignupForm(props) {
    const { handleSubmit } = props
    return (
            <Form onSubmit={handleSubmit} style={style}>
                <Form.Group controlId="Email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control required type="email" name='email' placeholder="Enter email" />
                    <Form.Text className='text-muted'>
                        Your email and other information will not be shared.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="Password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" name='password' placeholder="Password"/>
                </Form.Group>

                <Form.Group controlId="First Name">
                    <Form.Label>Firstname</Form.Label>
                    <Form.Control required type="text" name='firstName' placeholder="Enter Here"/>
                </Form.Group>

                <Form.Group controlId="Last Name">
                    <Form.Label>Lastname</Form.Label>
                    <Form.Control required type="text" name='lastName' placeholder="Enter Here"/>
                </Form.Group>
                
                <Form.Group controlId="Address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control required type="text" name='address' placeholder="ex: 10000 Somewhere Street" />
                </Form.Group>
                        
                <Form.Group controlId="Image">
                    <Form.Label>User Image URL</Form.Label>
                    <Form.Control required type="text" name='imageUrl' placeholder="Direct link from image host" />
                </Form.Group>

                <Button variant="primary" type='submit'>
                        Sign Up
                </Button>
                

            </Form>
    )
}

export default SignupForm;