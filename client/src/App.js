import React, { Component } from "react";

// web3, MetaMask, SKALE, Matic
import {
  getWeb3,
  isMetaMaskInstalled,
  isMetaMaskConnected,
  isAddressConnected,
  getExistingWeb3,
  getMaticWeb3,
  switchToMatic,
  switchToSKALE
} from "./getWeb3";

// Smart Contracts
import EtherEmpireContract from "./contracts/EtherEmpireWorld.json"
import EtherEmpireToken from "./contracts/EtherEmpireToken.json"
import TokenAirDrop from "./contracts/TokenAirDrop.json"

// css style
import "./App.css";

// Component
import Routes from "./Routes";


class App extends Component {
  state = { web3: null, accounts: null, instance: null };

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
      console.log(accounts);
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

  componentDidMount = async () => {
    await this.setWeb3(getExistingWeb3())
  }


  render() {

    return (
      <div className="App">
        <Routes
          web3={this.state}
          connectWeb3={this.connectWeb3}
          connected={this.state.accounts && this.state.accounts.length != 0}
          installed={isMetaMaskInstalled}
        />
      </div>
    )
  }
}

export default App;



