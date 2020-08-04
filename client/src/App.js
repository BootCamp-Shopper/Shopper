import React from "react";
import { Navbar } from "./components/";
import Routes from "./Routes";


export default class App extends React.Component {
  constructor() {
     super();

     this.state = {
        activeLink: document.location.pathname,
     }
  }

  handleClick = pathname => {
     this.setState({
        activeLink: pathname,
     });
  }

  render() {
     return (
       <div>
         <Navbar activeLink={this.state.activeLink} handleClick={this.handleClick}/>
         <div className="content"> 
            <Routes />
         </div>
       </div>
    );
  }
}
