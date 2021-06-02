import React, { useEffect } from "react";
import { Link } from "react-router-dom";
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

// Image
import background from "../Images/HomeBackground.jpg"
import placeholder from "../Images/placeholder-pic.png"




function LandingPageHeader() {
  let pageHeader = React.createRef();

  useEffect(() => {
    if (window.innerWidth < 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
    <>
      <div
        style={{
          backgroundImage:
            `url(${background})`
        }}
        className="page-header"
        data-parallax={true}
        ref={pageHeader}
      >
        <div className="filter" />
        <Container>
          <Row>
            <Col md="9">
              <div className="motto text-center float-left">
                <h1 className="text-left-align">Experience Blockchain Technology</h1>
                <h3 className="text-left-align">Conquer. Defend. Unite</h3>
                <br />
                <br />
              </div>
            </Col>
            <Col md="2">

            </Col>
          </Row>
          <Row>
            <Col md="8">
              <div className="motto text-center float-left">
                <p className="text-left-align font-size">
                  Ether Empire is a multiplayer blockchain territorial-conquest game
                  incorporating yield farming, diplomacy, and an opportunity to earn real money
                </p>
                <br />
                <Button
                  className="btn-round float-left play-button"
                  color="success"
                  to="/game"
                  tag={Link}
                  size="lg"
                >
                  <i className="fa fa-play" />
              Play Game
            </Button>
                <Button
                  className="btn-round float-left"
                  color="info"
                  to="/game"
                  tag={Link}
                  size="lg"
                >
                  <i className="fa fa-play" />
              Start Tutorial
            </Button>
              </div>

            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default LandingPageHeader;





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