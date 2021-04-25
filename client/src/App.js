import React, { Component } from "react";
import getWeb3 from "./getWeb3";
import Main from "./webapp/src/components/Pages/Main";

import "./App.css";
import "./contracts/GameWorld.json";

class App extends Component {
  state = { web3: null, accounts: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];

      // This is a JS interface that makes it easy to talk to a smart contract 
      const instance = new web3.eth.Contract(
        GameWorld.abi,
        deployedNetwork && deployedNetwork.address,
      );

      const val = await instance.allEntities.call(0); // readonly call - no gas involved 

      instance.buildFarm(0,0,10).send({from: accounts[0]}); 
      
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Sample code for invoking (send) and receiving (call) from a contract 
    // // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });

    // // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();

    // // Update state with the result.
    // this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <Main/>
      </div>
    );
  }
}

export default App;
