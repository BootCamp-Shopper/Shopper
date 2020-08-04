import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class UsersInfo extends Component{
    //template for react component
    constructor(){
        super();
        //inital state of user info component; user should have info that matches tables in db
        this.state = {
            users: [], 
            //renders placeholder while loading data
            loading: true
        };
    };

    async componentDidMount(){
        //this is where fetch request goes; if no data or error connecting to server, catch error & send to console
        try {
            //after component mounts; call server, use route, GET db info, setState sets information to the state            
            const {data} = await axios.get('/api/users');
            
            this.setState({
                users: data,
                loading: false
            });

            console.log(data);
        } catch (error) {
            console.error('ERROR: ', error);           
        }   
    };

    async handleDelete(deletingUserId) {
        try {
            const {data} = await axios.delete(`/api/users/${deletingUserId}`);
            console.log(data);
            // ONLY DELETE THE USER IF IT'S SUCCESSFUL IN THE BACKEND
            // AND MOVE ON TO LINE 40

            const newUsersList = this.state.users.filter(user => {
                return user.id !== deletingUserId;
            });
            this.setState ({
                users: [...newUsersList]
            });
        } catch (err) {
            console.error('ERROR: ', err);
        }
    };

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
            <div>This is the ADMIN's route to ALL USERS info.
                <hr />
                {users.map(user => (
                    <li className="list" key={user.id}>
                        <div>
                            <img src = {user.imageUrl} alt='userImage'/>
                            <p> Name: <Link to={`/users/${user.id}`}>{user.firstName} {user.lastName}</Link></p>
                            <p> Address: {user.addresses[0].line1}, {user.addresses[0].line2} </p>
                            <p> City: {user.addresses[0].city} </p>
                            <p> State: {user.addresses[0].state} </p>
                            <p> Zipcode: {user.addresses[0].zip} </p>
                            <p> Email: {user.email}</p>
                            <p> Role: {user.role}</p>
                            <button type="button" onClick={evt => this.handleDelete(user.id)}>Delete</button>
                        </div>
                    </li>)
                )}
            </div>    
        )
    }
}