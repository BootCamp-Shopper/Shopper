import React, {Component} from 'react';
import axios from 'axios';

export default class UsersInfo extends Component{
    //template for react component
    constructor(){
        super()
        //inital state of user info component; user should have info that matches tables in db
        this.state = {
            users: [], 
            //renders placeholder while loading data
            loading: true
            
        }
    }

    async componentDidMount(){
        //this is where fetch request goes; if no data or error connecting to server, catch error & send to console
        try {
            //after component mounts; call server, use route, GET db info, setState sets information to the state            
            const {data} = await axios.get('/api/users'); //BLOCKER: users route not built
            
        
            this.setState({
                users: data,
                loading: false
            }) 

        } catch (error) {
            console.error('ERROR: ', error);           
            
        }
        
        
    }

    render(){
        //retrieving user and loading info from state
        const {users, loading} = this.state
        
        if (loading){
            //display loading if loading = true on state
            return <div>Loading...</div>
        }

        //this is an error check; if loading completes & no user found, render warning
        if (!users.length){
            return <div>There are no users in the database.</div>
        }

        //should display user image, name, address & email if user is found.
        return (
            <div>This is the user info component.
                {users.map(user => (
                    <li key={user.id}>
                        <div>
                            <img src = {user.imageUrl} alt='userImage'/>
                            <p>Username: {user.name}</p>
                            <p>Address: {user.address}</p>
                            <p>Email: {user.email}</p>
                        </div>
            
                    </li>)
                )}
            </div>    
        )
    }
}