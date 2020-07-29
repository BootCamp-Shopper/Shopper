import React, {Component} from 'react';


export class userInfoComponent extends Component{
    //template for react component
    constructor(){
        super()
        //inital state of user info component; user should have info that matches tables in db
        this.state = {
            user: {
                name: "",
                imageUrl: "",
                address: "",
                email: ""
            },
            //renders placeholder while loading data
            loading: true
            
        }
    }

    async componentDidMount(){
        //this is where fetch request goes; if no data or error connecting to server, catch error & send to console
        try {
            //after component mounts; call server, use route, GET db info, setState sets information to the state
            const response = await fetch('/api/user', { method: 'GET' }); //BLOCKER: user route not built
            const userData = await response.json();
        
            this.setState({
                user: userData,
                loading: false
            }) 
        } catch (error) {
            console.error('ERROR: ', error);           
            
        }
        
        
    }

    render(){
        //retrieving user and loading info from state
        const {user, loading} = this.state
        
        if (loading){
            //display loading if loading = true on state
            return <div>Loading...</div>
        }

        //this is an error check; if loading completes & no user found, render "User not found."
        if (!user.name){
            <div>User not found.</div>
        }

        //should display user image, name, address & email if user is found.
        return (
            <div>This is the user info component.
                <div><img src = {this.state.user.imageUrl}/>
                    <p>Username: {this.state.user.name}</p>
                    <p>Address: {this.state.user.address}</p>
                    <p>Email: {this.state.user.email}</p></div>
            </div>
        )
    }
}