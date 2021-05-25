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
import placeholder from "../Images/placeholder-pic.png"


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
              <Col className="ml-auto mr-auto" md="8">
                <h1 className="title">What is Ether Empire?</h1>
                <h3 className="description">
                  Ether Empire is a multiplayer blockchain territorial-conquest game
                  incorporating stategy, diplomacy, and an opportunity to earn real money
                </h3>
                <br />
                <Button
                  className="btn-round"
                  color="info"
                  to="/how-to-play"
                  tag={Link}
                >
                  See Details
                </Button>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="section section-dark text-center">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                <h1 className="title">Combat</h1>
                <h3 className="description">
                  Battle for control over profitable territories that regularly generates Empire token
                </h3>
                <br />
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
                    <h2 className="info-title">Farm</h2>
                    <h5 className="description">
                      <ul className="left-align">
                        <li>Generates Empire tokens</li>
                        <li>Generation rates are random and fixed</li>
                      </ul>
                    </h5>
                  </div>
                </div>
              </Col>
              <Col md="4">
                <div className="info">
                  <div className="icon icon-info">
                    <i className="nc-icon nc-chart-bar-32" />
                  </div>
                  <div className="description">
                    <h2 className="info-title">Army</h2>
                    <h5 className="description">
                      <ul className="left-align">
                        <li>Captures other players' farm</li>
                        <li>Counters hostile armies </li>
                      </ul>
                    </h5>
                  </div>
                </div>
              </Col>
              <Col md="4">
                <div className="info">
                  <div className="icon icon-info">
                    <i className="nc-icon nc-bulb-63" />
                  </div>
                  <div className="description">
                    <h2 className="info-title">Wall</h2>
                    <h5 className="description">
                      <ul className="left-align">
                        <li>Defends against pillaging armies</li>
                      </ul>
                    </h5>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="section section-dark text-center">
          <Container>
            <h1 className="title">Diplomacy</h1>
            <h3 className="description slight-margin-bottom">
              Not every conflict needs to be resolved with violence.
              Utilizing smart contract technology on the Ethereum blockchain,
              Players can craft customized treaties with other players to
              secure peace and lucrative deals.
            </h3>
            <Row>
              <Col md="6">
                <img src={placeholder} alt="pic" className="placeholder-pic"></img>
              </Col>
              <Col md="6">
                <h3 className="description description2">Create a coalition with multiple neighbors</h3>
                <h3 className="description description2">Mandate a regular contribution of Empire tokens towards maintaining a common army</h3>
                <h3 className="description description2">Fund allies</h3>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="section section-dark text-center">
          <Container>
            <h1 className="title">Player Drive Economy</h1>
            <h3 className="description slight-margin-bottom">
              The economy in this game is entirely driven by the actions of the players.
              We maintain the value of Empire tokens by enforcing the following set of tokenomics measures
            </h3>

            <Row>
              <Col md="6">
                <h3 className="description description2">For every farmland that is pillaged, half the amount is transferred to the pillager while the rest of the land value is burnt (deflationary)</h3>
                <h3 className="description description2">Tokens spent on wall construction and army recruitment are burnt (deflationary)</h3>
                <h3 className="description description2">The amount of burnt tokens are re-distributed into the world through increased farm yields (inflationary) </h3>
              </Col>
              <Col md="6">
                <img src={placeholder} alt="pic" className="placeholder-pic"></img>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="section text-center">
          <Container>
            <Row>
              <CrowdSale web3={props.web3} />
            </Row>
          </Container>
        </div>

        <div className="section landing-section">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                <h1 className="text-center title">We'd love your feedback!</h1>
                <Form className="contact-form">
                  <Row>
                    <Col md="6">
                      <label>Name</label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-single-02" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Name" type="text" />
                      </InputGroup>
                    </Col>
                    <Col md="6">
                      <label>Email</label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Email" type="text" />
                      </InputGroup>
                    </Col>
                  </Row>
                  <label>Message</label>
                  <Input
                    placeholder="Tell us your thoughts and feelings..."
                    type="textarea"
                    rows="4"
                  />
                  <Row>
                    <Col className="ml-auto mr-auto" md="4">
                      <Button className="btn-fill" color="danger" size="lg">
                        Send Message
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="section text-center">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                <h1 className="title">FAQ</h1>
              </Col>
            </Row>
          </Container>
        </div>



      </div>

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