import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import { getWeb3, isMetaMaskInstalled, isMetaMaskConnected, isAddressConnected, getExistingWeb3, getMaticWeb3, switchToMatic, switchToSKALE } from "./getWeb3";

// Pages 
import Home from "./webapp/src/components/Pages/Home";
import Game from "./webapp/src/components/Pages/Game";
import HowToPlay from "./webapp/src/components/Pages/HowToPlay";
import Roadmap from "./webapp/src/components/Pages/Roadmap";

// Smart Contracts
import EtherEmpireContract from "./contracts/EtherEmpireWorld.json"
import EtherEmpireToken from "./contracts/EtherEmpireToken.json"
import TokenAirDrop from "./contracts/TokenAirDrop.json"

// css style
import "./App.css";


class App extends Component {
  state = { web3: null, accounts: null, instance: null };

  constructor(props) {
    super(props);
    this.setWeb3(getExistingWeb3())
  }

  // safe to use metamask interaction, called upon clicking "Connect MetaMask"
  connectWeb3 = async () => {
    try {
      await switchToSKALE();   // UNCOMMENT TO USE SKALE
      const web3 = await getWeb3();
      await this.setWeb3(web3)
    } catch (error) {
      console.error(error);
    }
  }

  // not safe to use metaMask interaction, called upon loading
  setWeb3 = async (web3) => {
    try {
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const instance = new web3.eth.Contract(
        EtherEmpireContract.abi,
        EtherEmpireContract.networks[networkId] && EtherEmpireContract.networks[networkId].address,
      );
      const tokenInstance = new web3.eth.Contract(
        EtherEmpireToken.abi,
        EtherEmpireToken.networks[networkId] && EtherEmpireToken.networks[networkId].address,
      );
      const airDropInstance = new web3.eth.Contract(
        TokenAirDrop.abi,
        TokenAirDrop.networks[networkId] && TokenAirDrop.networks[networkId].address,
      );
      this.setState({ web3, accounts, instance, tokenInstance, airDropInstance });
    } catch (error) {
      console.error(error);
    }
  }

  homeConnected() {
    return this.state.accounts && this.state.accounts.length != 0
  }

  /*  MOVED TO CONSTRUCTOR 
  componentWillMount = async () => {
    await this.setWeb3(getExistingWeb3())
  }
  */

  render() {
    // TODO: BETTER VALIDATION?
    if (this.state.accounts == null || this.state.web3 == null) {  // Wait for state(web3, accounts, etc...)  to set before rendering pages
      return <div>Loading Page</div>  //  TODO: Loading Page 
    }
    else { // Safe to load pages after state is set
      return (
        <div className="App">
          {/* React router for page navigation */}
          <Switch>
            <Route exact path="/" render={(props) =>
              <Home
                {...props}
                web3={this.state}
                connectWeb3={this.connectWeb3}
                connected={this.state.accounts && this.state.accounts.length != 0}
                installed={isMetaMaskInstalled}
              />}
            />
            <Route path="/game" render={(props) =>
              <Game
                {...props}
                web3={this.state}
                connectWeb3={this.connectWeb3}
                connected={this.state.accounts && this.state.accounts.length != 0}
                installed={isMetaMaskInstalled}
              />}
            />
            <Route path="/how-to-play" render={(props) =>
              <HowToPlay
                {...props}
                web3={this.state}
                connectWeb3={this.connectWeb3}
                connected={this.state.accounts && this.state.accounts.length != 0}
                installed={isMetaMaskInstalled}
              />}
            />
            <Route path="/roadmap" render={(props) =>
              <Roadmap
                {...props}
                web3={this.state}
                connectWeb3={this.connectWeb3}
                connected={this.state.accounts && this.state.accounts.length != 0}
                installed={isMetaMaskInstalled}
              />}
            />
            <Redirect to="/" />
          </Switch>
        </div>
      )
    }
  }
}

export default App;



