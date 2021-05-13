import React, { useState, useEffect } from "react";
import "../CSS/Home.css";
import logoAnimation from "../Images/ether-empire-logo.mp4";
import { Button } from 'reactstrap';
import Web3 from "web3";
import CheckIcon from '@material-ui/icons/Check';
import { useHistory } from "react-router-dom";
import CrowdSale from "../Crowdsale/Crowdsale";


function Home(props) {

  const history = useHistory();

  const routeChange = () => {
    let path = `how-to-play`;
    history.push(path);
  }

  console.log(props);


  return (
    <div className="home">
      <div className="logoSection__container">
        <div className="logoSection">
          <center><h1 className="title">Ether Empire</h1></center>
          <video className="logoAnimation" loop autoPlay muted>
            <source src={logoAnimation} type="video/mp4" />
          </video>
          <div className="getStarted__container">
            <center>
              <Button color="success" onClick={routeChange}>Get Started</Button>{' '}
            </center>
          </div>
        </div>
      </div>

      <div className="crowdsaleSection__container">
        <CrowdSale
          web3={props.web3}
        />
      </div>
    </div>
  );

}
export default Home;
