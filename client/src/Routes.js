import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Items, Item, Cart, UsersInfo, MemberInfo, Signup, Login, NotFound, Payment } from './components/';

export default function Routes(props) {
  const { handleClick } = props;

  // put all routes here
  return (
    <Switch>
      <Route exact path="/" render={() => <Home handleClick={handleClick}/>} />

      <Route exact path="/superpowers" component={Items} />
      <Route path="/superpowers/:superpowerId" component={Item} />

      <Route path="/cart" component={Cart} />

      <Route path="/signup" component={Signup} />
      <Route path="/login" render={() => <Login handleClick={handleClick}/>} />
      <Route path="/payment" component={Payment}/>

      <Route exact path="/users" component={UsersInfo} />
      <Route path="/users/:userId" render={(matchProps) => <MemberInfo {...matchProps} handleClick={handleClick} />}/>

      <Route path="*" component={NotFound} />
    </Switch>
  );
}
