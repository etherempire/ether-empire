import React, { Component } from "react";
import {getWeb3, isMetaMaskInstalled, isMetaMaskConnected, isAddressConnected, getExistingWeb3} from "./getWeb3";
import Main from "./webapp/src/components/Pages/Main";
import EtherEmpireContract from "./contracts/EtherEmpireWorld.json"

import "./App.css";

class App extends Component {
  state = { web3: null, accounts: null, instance: null };

  connectWeb3 = async () => {
    try {
      const web3 = await getWeb3();
      await this.setWeb3(web3)
    } catch (error) {
      console.error(error);
    }
  }

  setWeb3 = async (web3) => {
    try {
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = EtherEmpireContract.networks[networkId];
      const instance = new web3.eth.Contract(
        EtherEmpireContract.abi,
         deployedNetwork && deployedNetwork.address,
      );
      this.setState({ web3, accounts, instance});
    } catch (error) {
      console.error(error);
    }
  }

  homeConnected(){
    return this.state.accounts && this.state.accounts.length != 0
  }

  componentDidMount = async () => {
    await this.setWeb3(getExistingWeb3())
  }

  render() {
    return (
      <div className="App">
        <Main 
          connected={this.state.accounts && this.state.accounts.length != 0} 
          installed={isMetaMaskInstalled} 
          web3={this.state} 
          connectWeb3={this.connectWeb3}/>
      </div>
    )
  }
}

export default App;
