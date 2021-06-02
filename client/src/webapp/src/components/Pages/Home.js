import React, { useEffect } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
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
              <Col className="float-left combat-section-text" md="6">
                <h2 className="title text-left-align">Combat</h2>
                <p className="description text-left-align">
                  Battle for control over profitable territories that regularly generates Empire token.
                  When your army encounters a hostile army or wall,
                  a battle takes place where the probability of victory
                  is dependent upon the relative strength of the two sides.
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
                <img className="placeholder-pic" src={placeholder} />
              </Col>
              <Col md="6">
                <h2 className="title text-left-align">Diplomacy</h2>
                <p className="description slight-margin-bottom text-left-align">
                  Not every conflict needs to be resolved with violence.
                  Utilizing smart contract technology on the Ethereum blockchain,
                  Players can craft customized treaties with other players to
                  secure peace and lucrative deals.
                </p>
                <p className="description description2">Create a coalition with multiple neighbors</p>
                <p className="description description2">Mandate a regular contribution of Empire tokens towards maintaining a common army</p>
                <p className="description description2">Fund allies</p>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="section section-dark text-center">
          <Container>
            <Row>
              <Col md="6">
                <h2 className="title text-left-align">Player Drive Economy</h2>
                <p className="description slight-margin-bottom text-left-align">
                  The economy in this game is entirely driven by the actions of the players.
                  We maintain the value of Empire tokens by enforcing the following set of tokenomics measures
                </p>
                <p className="description description2">For every farmland that is pillaged, half the amount is transferred to the pillager while the rest of the land value is burnt (deflationary)</p>
                <p className="description description2">Tokens spent on wall construction and army recruitment are burnt (deflationary)</p>
                <p className="description description2">The amount of burnt tokens are re-distributed into the world through increased farm yields (inflationary) </p>
              </Col>
              <Col md="6">
                <img className="placeholder-pic" src={placeholder} />
              </Col>
            </Row>
          </Container>
        </div>

        <div className="section section-dark text-center">
          <Container>
            <Row>
              <Col md="6">
                <img className="placeholder-pic" src={placeholder} />
              </Col>
              <Col md="6">
                <h2 className="title text-left-align">NFTs</h2>
                <p className="description slight-margin-bottom text-left-align">
                  Token will be minted and burnt in a manner that directly affects gameplay.
                  Whenever an army is created or a wall is built, the spent tokens are burnt,
                  and at regular intervals the same amount is minted and redistributed to all farm owners in the form of ‘rain’ to maintain a stable token supply.
                  The more conflicts that occur in a particular world, the higher the reward in building farms,
                  driving up total land value and thus creating potential for more conflicts...
                  the cycle repeats itself, creating endless opportunities for conflicts and exciting gameplay.
                </p>
                <p className="description description2">Create a coalition with multiple neighbors</p>
                <p className="description description2">Mandate a regular contribution of Empire tokens towards maintaining a common army</p>
                <p className="description description2">Fund allies</p>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="section section-dark text-center">
          <Container>
            <Row>
              <Col md="6">
                <h2 className="title text-left-align">Empire Token</h2>
                <p className="description slight-margin-bottom text-left-align">
                  Token will be minted and burnt in a manner that directly affects gameplay.
                  Whenever an army is created or a wall is built, the spent tokens are burnt,
                  and at regular intervals the same amount is minted and redistributed to all farm owners in the form of ‘rain’ to maintain a stable token supply.
                  The more conflicts that occur in a particular world, the higher the reward in building farms,
                  driving up total land value and thus creating potential for more conflicts...
                  the cycle repeats itself, creating endless opportunities for conflicts and exciting gameplay.
                </p>
                <p className="description description2">To give complete control to the players over the economy of an Ether Empire realm,
                each deployed realm has an independent currency.
                This means that multiple variants of EMP will be created,
                separate for each realm, and hold their own price valuations.</p>
              </Col>
              <Col md="6">
                <img className="placeholder-pic" src={placeholder} />
              </Col>
            </Row>
          </Container>
        </div>

        <div className="section section-dark text-center">
          <Container>
            <Row>
              <Button
                className="btn-round"
                color="info"
                href="https://etherempireofficial.gitbook.io/ether-empire/gameplay"
                target="_blank"
              >
                LEARN MORE ABOUT THE GAMEPLAY
                  <i className="fa fa-play" />
              </Button>
            </Row>
          </Container>
        </div>


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
            <br />
            <br />
            <br />
            <br />

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