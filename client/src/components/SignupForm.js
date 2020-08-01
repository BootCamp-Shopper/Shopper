import React from 'react';

function SignupForm (props){
    const {handleSubmit} = props
    return (
        <div>
            <form onSubmit= {handleSubmit} name='signup'>
            <div>
                <label htmlFor='email'>
                    <small>
                        Email:
                    </small>
                </label>
                <input name='email' type='text'/>
            </div>
            
            <div>
            <label htmlFor='password'>
                    <small>
                        Password:
                    </small>
                </label>
                <input name='password' type='password'/>
            </div>
            
            <div>
            <label htmlFor='username'>
                    <small>
                        Username:
                    </small>
                </label>
                <input name='username' type='text'/>
            </div>

            <div>
            <label htmlFor='address'>
                    <small>
                        Address:
                    </small>
                </label>
                <input name='address' type='text'/>
            </div>

            <div>
            <label htmlFor='imageUrl'>
                    <small>
                        ImageUrl:
                    </small>
                </label>
                <input name='imageUrl' type='text'/>
            </div>

            <div>
                <button type='submit'>
                    Sign Up
                </button>
            </div>

            </form>
        </div>
    )
}