import React from "react";
import { Navbar, Items } from "./components/";
import Routes from "./Routes";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    );
  }
}
