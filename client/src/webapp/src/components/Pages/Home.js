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

  const history = useHistory();

  const routeChange = () => {
    let path = `how-to-play`;
    history.push(path);
  }

  return (
    <div className="home">
      <center><h1 className="title">Ether Empire</h1></center>
      <video className="logoAnimation" loop autoPlay muted>
        <source src={logoAnimation} type="video/mp4" />
      </video>
      <div >
        <center>
          <Button color="success" onClick={routeChange}>Get Started</Button>{' '}
        </center>
      </div>
    </div>
  );

}
export default Home;
