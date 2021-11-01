import React, { useEffect, useState } from "react";
//import QrReader from 'react-qr-reader'

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  CardSubtitle,
  CardText,
  CardLink,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";


import { Link } from "react-router-dom";

// Components
import HomeNavbar from "../Navbars/HomeNavbar";
import LandingPageHeader from "./LandingPageHeader";
import CrowdSale from "../Crowdsale/Crowdsale";

import "../CSS/Home.css";

// Images
import SKALELogo from "../Images/SKALE-logo.png"
import MetaMaskLogo from "../Images/MetaMask-logo.png"
import BGALogo from "../Images/BGA-logo.png"
import gameDemo from "../Images/gameDemo.png"
import placeholder from "../Images/HomeBackground.jpg"


function Home(props) {
  document.documentElement.classList.remove("nav-open");
  useEffect(() => {
    document.body.classList.add("profile-page");
    return function cleanup() {
      document.body.classList.remove("profile-page");
    };
  });



  return (
    <>
      <HomeNavbar connectWeb3={props.connectWeb3} connected={props.connected} />
      <LandingPageHeader />



      <div className="main">


        <div className="section section-dark text-center">
          <Container>
            <Row>
              <Col>
                <h2 className="title">A new genre made possible by blockchain</h2>
              </Col>
            </Row>
            <div className="row-test">
              <Row>


                <Col md="4" className="col-test">
                  <div>
                    <Card className="background">
                      <CardBody>
                        <h2>⚔️</h2>
                        <h4>Real stakes</h4>
                      </CardBody>
                    </Card>
                  </div>
                </Col>
                <Col md="4" className="col-test">
                  <div>
                    <Card className="background">
                      <CardBody>
                        <h2>👐</h2>
                        <h4>Deep diplomacy</h4>
                      </CardBody>
                    </Card>
                  </div>
                </Col>
                <Col md="4" className="col-test">
                  <div>
                    <Card className="background">
                      <CardBody>
                        <h2>🌾</h2>
                        <h4>Player-driven economy</h4>
                      </CardBody>
                    </Card>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>

        <div className="section section-dark text-center">
          <Container>
            <Row>
              <Col className="float-left combat-section-text" md="6">
                <h5 className="text-left-align section-name">Real Stakes</h5>
                <hr />
                <h4 className="text-left-align">Cultivate lands</h4>
                <p className="description text-left-align">
                  Stake Empire Tokens (EMP) into farm plots to earn real profits.
                  The amount you generate is proportional to the amount of EMP staked.
                  All tokens can be unstaked without loss.
                </p>

                <h4 className="text-left-align">Expand</h4>
                <p className="description text-left-align">
                  Farm plots can be conquered, so make sure to defend them with walls!
                  You can also expand your empire through recruiting
                  armies and conquering other players’ land.
                </p>

                <h4 className="text-left-align">Strategize</h4>
                <p className="description text-left-align">
                  As you expand your empire, the profit you generate increases, but so does the risk of losing property to invaders! Develop a strategy that allows you to thrive in this dynamic world.
                </p>

                <br />
                <br />
              </Col>
              <Col md="6">
                <img className="combat-section-image" src={gameDemo} />
              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <Col md="4">
                <div className="info">
                  <div className="icon icon-info">
                    <i className="nc-icon nc-album-2" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Farm</h4>
                    <p className="description">
                      <ul className="text-left-align">
                        <li>Generates Empire tokens</li>
                        <li>Generation rates are random and fixed</li>
                      </ul>
                    </p>
                  </div>
                </div>
              </Col>
              <Col md="4">
                <div className="info">
                  <div className="icon icon-info">
                    <i className="nc-icon nc-chart-bar-32" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Army</h4>
                    <p className="description">
                      <ul className="text-left-align">
                        <li>Captures other players' farm</li>
                        <li>Counters hostile armies </li>
                      </ul>
                    </p>
                  </div>
                </div>
              </Col>
              <Col md="4">
                <div className="info">
                  <div className="icon icon-info">
                    <i className="nc-icon nc-bulb-63" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Wall</h4>
                    <p className="description">
                      <ul className="text-left-align">
                        <li>Defends against pillaging armies</li>
                      </ul>
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="section section-dark text-center">
          <Container>
            <Row>
              <Col md="6">
                <Card>
                  <CardBody>
                    <img className="placeholder-pic" src={placeholder} />
                  </CardBody>
                </Card>
              </Col>
              <Col md="6">
                <h2 className="title text-left-align">Deep Diplomacy</h2>
                <p className="description slight-margin-bottom text-left-align">
                  Utilizing smart contract technology on the Ethereum blockchain,
                  players can craft customizable treaties with other players to secure peace and lucrative deals.
                </p>

                <h4 className="description text-left-align background-diplomacy">🏰  Create a coalition with multiple neighbors</h4>
                <h4 className="description text-left-align background-diplomacy">🗡 Maintain a common army</h4>
                <h4 className="description text-left-align background-diplomacy">💰 Fund allies</h4>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="section section-dark text-center">
          <Container>
            <Row>
              <Col md="6">
                <h5 className="text-left-align section-name">Player Driven Economy</h5>
                <hr />
                <h4 className="text-left-align">The token cycle</h4>
                <p className="description text-left-align"> Whenever an army is created or a wall is built, EMPs are burnt</p>
                <p className="description text-left-align">At regular intervals, an equal of EMPs is minted and redistributed to all farm owners in the form of ‘rain’ </p>
                <p className="description text-left-align">The total supply of EMP is thus maintained. </p>

                <h4 className="text-left-align">NFT items</h4>
                <p className="description text-left-align">
                  Special items in the game (e.g. weapons, runes) directly affect
                  gameplay through increasing army strength or farm yield,
                and are tracked by NFTs on the blockchain allowing them to be securely traded between players.</p>

                <br />
                <br />
                <br />
                <Button
                  className="btn-round float-left"
                  color="info"
                  href="https://app.gitbook.com/@etherempireofficial/s/ether-empire/"
                  target="_blank"
                >
                  LEARN MORE →
              </Button>
              </Col>
              <Col md="6">
                <Card className="player-driver-economy-card-gradient">
                  <CardBody>
                    <img className="placeholder-pic" src={placeholder} />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>


        <div className="section section-dark text-center">
          <Container>
            <Row>

            </Row>
          </Container>
        </div>


        { // !!!!!!PARTNERSHIP SECTION (COULD BE USED LATER)!!!!!!
          /*
            <div className="section section-light-dark text-center">
            <Container>
              <Row>
                <Col md="12">
                  <h2 className="title partner-title">Partners?</h2>
                  <div className="partner-logos-container">
                    <img className="partner-logo" src={SKALELogo} />???
                    <img className="partner-logo" src={MetaMaskLogo} />???
                    <img className="partner-logo" src={BGALogo} />???
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          */
        }



        <div className="section section-light-dark">
          <Container>
            <Row>
              <Col md="2">

              </Col>
              <Col md="2">
                <p >Developer</p>
                <br />
                <p ><a
                  href="https://github.com/jinhongkuan/ether-empire"
                  target="_blank"
                >
                  GitHub
                </a></p>
              </Col>
              <Col md="3">
                <p>Contact</p>
                <br />
                <p><a
                  href="mailto:etherempireofficial@gmail.com"
                  target="_blank"
                >
                  etherempireofficial@gmail.com
                </a></p>
              </Col>
              <Col md="2">
                <p>Find Us</p>
                <br />
                <p><a
                  href="https://discord.gg/X9p9gXPCc7​"
                  target="_blank"
                >
                  Discord
                </a></p>
                <p><a
                  href="https://www.reddit.com/r/etherempireofficial/"
                  target="_blank"
                >
                  Reddit
                </a></p>
                <p><a
                  href="https://twitter.com/Eth_Empire?s=20"
                  target="_blank"
                >
                  Twitter
                </a></p>
                <p><a
                  href="https://www.youtube.com/channel/UCMuvqLgSvVyXiBAOn7GMyfQ"
                  target="_blank"
                >
                  YouTube
                </a></p>
              </Col>
              <Col md="3">
                <p>About</p>
                <br />
                <p><a
                  href="https://app.gitbook.com/@etherempireofficial/s/ether-empire/"
                  target="_blank"
                >
                  Litepaper
                </a></p>
                <p><a
                  href=""
                  target="_blank"
                >
                  Team
                </a></p>
                <p><a
                  href="https://app.gitbook.com/@etherempireofficial/s/ether-empire/"
                  target="_blank"
                >
                  Term of Use
                </a></p>
                <p><a
                  href="https://app.gitbook.com/@etherempireofficial/s/ether-empire/"
                  target="_blank"
                >
                  Privacy Policy
                </a></p>
                <p><a
                  href="https://ether-empire.fandom.com/wiki/Ether_Empire_Wiki"
                  target="_blank"
                >
                  Wiki
                </a></p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      <footer className="footer">
        <Container>
          <Row>
            <div className="credits ml-auto">
              <span className="copyright">
                © {new Date().getFullYear()} Ether Empire
                    </span>
            </div>
          </Row>
        </Container>
      </footer>

    </>
  );
}

export default Home;




/*!

=========================================================
* Paper Kit React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/