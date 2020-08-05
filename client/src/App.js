import React from "react";
import { Navbar } from "./components/";
import Routes from "./Routes";


export default class App extends React.Component {
   constructor() {
      super();

      this.state = {
         activeLink: document.location.pathname,
         user: {},
      }
   }

   handleClick = pathname => {
      this.setState({
         activeLink: pathname,
      });
   }

   handleUser = userInfo => {
      this.setState({
         user: userInfo,
      })
   }

   render() {
      return (
         <div>
            <Navbar activeLink={this.state.activeLink} user={this.state.user} handleClick={this.handleClick} />
            <div className="content">
               <Routes user={this.state.user} handleClick={this.handleClick} handleUser={this.handleUser} />
            </div>
         </div>
      );
   }
}
