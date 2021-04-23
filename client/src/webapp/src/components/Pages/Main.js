import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import Game from "./Game";
import HowToPlay from "./HowToPlay";
import GetInvolved from "./GetInvolved";
 
class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1>Ether Empire</h1>
          <ul className="header">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/game">Game</NavLink></li>
            <li><NavLink to="/how-to-play">How To Play</NavLink></li>
            <li><NavLink to="/get-involved">Get Involved</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/game" component={Game}/>
            <Route path="/how-to-play" component={HowToPlay}/>
            <Route path="/get-involved" component={GetInvolved}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default Main;