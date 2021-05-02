import React, { useState, useEffect } from "react";
import "../CSS/Home.css";
import logoAnimation from "../Images/ether-empire-logo.mp4";
import { Button } from 'reactstrap';
import Web3 from "web3";
import CheckIcon from '@material-ui/icons/Check';
//import detectEthereumProvider from '@metamask/detect-provider';
//import getWeb3 from "../../../../getWeb3";
import { useHistory } from "react-router-dom";

function Home() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [connected, setConnected] = useState(false);

  const history = useHistory();

  const routeChange = () => {
    let path = `how-to-play`;
    history.push(path);
  }

  // Wait for loading completion to avoid race conditions with web3 injection timing.
  // Look for accounts on load


  window.addEventListener("load", async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);   // set state
      try {
        // Request account access if needed
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts)  // set state
        // Acccounts now exposed
      } catch (error) {
        console.log(error);
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      // Use Mist/MetaMask's provider.
      const web3 = window.web3;
      setWeb3(web3);  // set state
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts)  // set state
      console.log("Injected web3 detected.");
    }
    // Fallback to localhost; use dev console port by default...
    else {
      const provider = new Web3.providers.HttpProvider(
        "http://127.0.0.1:8545"
      );
      const web3 = new Web3(provider);
      setWeb3(web3);
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts)  // set state
      console.log("No web3 instance injected, using Local web3.");
    }
  });

  // Look for account on click
  async function connectAccount() {
    // Modern dapp browsers...
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);   // set state
      try {
        // Request account access if needed
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts)  // set state
        // Acccounts now exposed
      } catch (error) {
        console.log(error);
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      // Use Mist/MetaMask's provider.
      const web3 = window.web3;
      setWeb3(web3);  // set state
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts)  // set state
      console.log("Injected web3 detected.");
    }
    // Fallback to localhost; use dev console port by default...
    else {
      const provider = new Web3.providers.HttpProvider(
        "http://127.0.0.1:8545"
      );
      const web3 = new Web3(provider);
      setWeb3(web3);
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts)  // set state
      console.log("No web3 instance injected, using Local web3.");
    }
  }


  window.ethereum.on('accountsChanged', function (accounts) {
    setAccounts(window.ethereum.selectedAddress);
  });


  /*
  connectToMetaMask();
  console.log("reach4", accounts);
  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  console.log("reach5", accounts);
  */

  return (
    <div className="home">
      <p className="test">Current account: {accounts[0]}</p>

      <center><h1 className="title">Ether Empire</h1></center>
      <video className="logoAnimation" autoPlay muted>
        <source src={logoAnimation} type="video/mp4" />
      </video>
      <div >
        <center>
          {accounts.length == 0 ?
            <Button color="warning" className="connectAccountButton" onClick={connectAccount}>Connect Account</Button>
            : <Button color="warning" className="connectAccountButton"><span className="connected"><span>Connected</span> <CheckIcon className="checkmark" /></span> </Button>
          }
          <Button color="success" onClick={routeChange}>Get Started</Button>{' '}
        </center>
      </div>
    </div>
  );

}
export default Home;