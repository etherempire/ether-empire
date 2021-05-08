import React, { Component } from "react";
import getWeb3 from "./getWeb3";
import Main from "./webapp/src/components/Pages/Main";
import EtherEmpireContract from "./contracts/EtherEmpireWorld.json"

import "./App.css";

class App extends Component {
  state = { web3: null, accounts: null, instance: null };

  connectWeb3 = async () => {
    try {
      const web3 = await getWeb3();
      console.log(web3)
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = EtherEmpireContract.networks[networkId];
      const instance = new web3.eth.Contract(
        EtherEmpireContract.abi,
         deployedNetwork && deployedNetwork.address,
      );

      this.setState({ web3, accounts, instance});
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }

  render() {
    return (
      <div className="App">
        <Main notConnected={!this.state.web3} web3={this.state} connectWeb3={this.connectWeb3}/>
      </div>
    )
  }
}

export default App;
