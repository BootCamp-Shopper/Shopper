import React from 'react';

function SignupForm(props) {
    const { handleSubmit } = props
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='email'>
                        <small>
                            Email:
                    </small>
                    </label>
                    <input name='email' type='text' />
                </div>

                <div>
                    <label htmlFor='password'>
                        <small>
                            Password:
                    </small>
                    </label>
                    <input name='password' type='password' />
                </div>

                <div>
                    <label htmlFor='name'>
                        <small>
                            First Name:
                    </small>
                    </label>
                    <input name='name' type='text' />
                </div>

                <div>
                <label htmlFor='name'>
                        <small>
                            Last Name:
                    </small>
                    </label>
                    <input name='name' type='text' />
                </div>

                <div>
                    <label htmlFor='address'>
                        <small>
                            Address:
                    </small>
                    </label>
                    <input name='address' type='text' />
                </div>

                <div>
                    <label htmlFor='imageUrl'>
                        <small>
                            ImageUrl:
                    </small>
                    </label>
                    <input name='imageUrl' type='text' />
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

export default SignupForm;