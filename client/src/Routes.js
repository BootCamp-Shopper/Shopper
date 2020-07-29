import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Items } from './components/';

export default function Routes() {
    // put all routes here 
    return (
        <Switch>
            <Route path="/items" component={Items} />
        </Switch>
    );
}