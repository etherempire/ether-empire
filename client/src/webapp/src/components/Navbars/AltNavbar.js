import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// nodejs library that concatenates strings
import classnames from "classnames";

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

function AltNavbar(props) {

  const [navbarColor, setNavbarColor] = useState("");
  const [navbarCollapse, setNavbarCollapse] = useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

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
                Getting started
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
export default AltNavbar;

