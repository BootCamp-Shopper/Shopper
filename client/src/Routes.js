import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Items, UsersInfo } from './components/';


export default function Routes() {
    // put all routes here 
    return (
        <Switch>
            <Route exact path="/" component={Home} />

            <Route exact path="/superpowers" component={Items} />
            <Route path="/superpowers/:superpowerId" />

            <Route path="/cart" />

            <Route exact path="/users" component={UsersInfo}/>
            <Route path ="/users/:userId" />
        </Switch>
    );
}