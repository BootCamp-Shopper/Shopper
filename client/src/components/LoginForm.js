import React from 'react';

function Form (props){
    const {handleSubmit} = props
    return (
        <div>
            <form onSubmit= {handleSubmit} name='login'>
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
                <button type='submit'>
                    Login
                </button>
            </div>

            </form>
        </div>
    )
}