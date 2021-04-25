import React, { Component } from "react";
import "./Home.css";
import logoAnimation from "./ether-empire-logo.mp4";
import { Button } from 'reactstrap';


class Home extends Component {
  render() {
    return (
      <div className="home">
        <center><h1 className="title">Ether Empire</h1></center>
        <video loop className="logoAnimation" autoPlay muted>
          <source src={logoAnimation} type="video/mp4" />
        </video>
        <div >
          <center>
            <Button color="warning">Connect to Metamask</Button>{' '}
            <Button color="success">Get Started</Button>{' '}
          </center>
        </div>
      </div>
    );
  }
}
export default Home;