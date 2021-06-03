import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// nodejs library that concatenates strings
import classnames from "classnames";

// Images
import logo from "../Images/ether-empire-logo.png";
import navLogo from "../Images/logo_64x64.png"
import redditLogo from "../Images/reddit-icon.png"
import githubLogo from "../Images/github-icon.png"
import discordLogo from "../Images/discord-icon.png"

// CSS styling
//import "../CSS/Main.css";

// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";



function WebsiteNavbar(props) {
  const [navbarColor, setNavbarColor] = useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <Navbar
      className={classnames("fixed-top", navbarColor)}
      color-on-scroll="300"
      expand="lg"
    >
      <Container>
        <div className="navbar-translate">
          <NavbarBrand data-placement="bottom" to="/" tag={Link}>
            Ether Empire
            {/* <img className="navigation-logo" src={navLogo}></img>*/}
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse,
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>
            <NavItem>
              <NavLink to="/game" tag={Link}>PLAY GAME</NavLink>
            </NavItem>


            <UncontrolledDropdown nav>
              <DropdownToggle
                caret
                color="default"
                data-toggle="dropdown"
                href="#pablo"
                nav
                onClick={(e) => e.preventDefault()}
              >
                <i className="fa fa-cogs d-lg-none d-xl-none" />
                Get started
              </DropdownToggle>
              <DropdownMenu className="dropdown-with-icons">
                <DropdownItem tag={Link} to="/how-to-play">
                  <i className="tim-icons icon-paper" />
                  Tutorial
                </DropdownItem>
                <DropdownItem tag={Link} to="/roadmap">
                  <i className="tim-icons icon-image-02" />
                  Development roadmap
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <UncontrolledDropdown nav>
              <DropdownToggle
                caret
                color="default"
                data-toggle="dropdown"
                href="#pablo"
                nav
                onClick={(e) => e.preventDefault()}
              >
                <i className="fa fa-cogs d-lg-none d-xl-none" />
                COMMUNITY
              </DropdownToggle>
              <DropdownMenu className="dropdown-with-icons">
                <DropdownItem href="https://discord.gg/X9p9gXPCc7​" target="_blank">
                  <i className="tim-icons icon-paper" />

                  Join Our Discord
                </DropdownItem>
                <DropdownItem href="https://www.reddit.com/r/etherempireofficial/" target="_blank">
                  <i className="tim-icons icon-paper" />
                  The Official Reddit
                </DropdownItem>
                <DropdownItem href="https://github.com/jinhongkuan/ether-empire" target="_blank">
                  <i className="tim-icons icon-paper" />
                  Contribute on GitHub
                </DropdownItem>
                <DropdownItem href="https://www.linkedin.com/company/ether-empire" target="_blank">
                  <i className="tim-icons icon-paper" />
                  Connect on LinkedIn
                </DropdownItem>
                <DropdownItem href="https://etherempireofficial.gitbook.io/ether-empire/" target="_blank">
                  <i className="tim-icons icon-paper" />
                  Read our Whitepaper
                </DropdownItem>
                <DropdownItem href="https://kuanjh123.medium.com/ether-empire-g-93b9f80acde2" target="_blank">
                  <i className="tim-icons icon-paper" />
                  Read up on Medium
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>



            {/* CONNECT WALLET BUTTON */}
            <NavItem>
              {
                !props.connected ?
                  <Button
                    className="btn-round"
                    color="danger"
                    onClick={props.connectWeb3}
                    outline
                  >
                    CONNECT WALLET
                </Button>
                  :
                  <Button
                    className="btn-round"
                    color="danger"
                  >
                    CONNECTED
                </Button>
              }

            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default WebsiteNavbar;
