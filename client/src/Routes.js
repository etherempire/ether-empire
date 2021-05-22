import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// Pages 
import Home from "./webapp/src/components/Pages/Home";
import Game from "./webapp/src/components/Pages/Game";
import HowToPlay from "./webapp/src/components/Pages/HowToPlay";
import Roadmap from "./webapp/src/components/Pages/Roadmap";

// Smart Contracts
import EtherEmpireContract from "./contracts/EtherEmpireWorld.json"
import EtherEmpireToken from "./contracts/EtherEmpireToken.json"
import TokenAirDrop from "./contracts/TokenAirDrop.json"

function Routes(props) {

  return (
    <div >
      {/* React router for page navigation */}
      <Switch>
        <Route exact path="/" render={() =>
          <Home
            {...props}
          />}
        />
        <Route path="/game" render={() =>
          <Game
            {...props}

          />}
        />
        <Route path="/how-to-play" render={() =>
          <HowToPlay
            {...props}

          />}
        />
        <Route path="/roadmap" render={() =>
          <Roadmap
            {...props}
          />}
        />
        <Redirect to="/" />
      </Switch>
    </div>
  )


}
export default Routes;