import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import {
  Route,
  HashRouter,
  Switch,
  NavLink as RRNavLink
} from "react-router-dom";
import Home from "./Home";
import Game from "./Game";
import HowToPlay from "./HowToPlay";
import GetInvolved from "./GetInvolved";
import logo from "./ether-empire-logo.png";
import "./Main.css";

const Main = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="main">
      <HashRouter>
        <div className="navigation-bar-container">
          <div className="navigation-bar">
            <Navbar color="light" light expand="xl">
              <NavItem>
                <NavLink exact to="/" activeClassName="active" tag={RRNavLink}><img className="navigation-logo" src={logo}></img></NavLink>
              </NavItem>
              <NavbarToggler onClick={toggle} />
              <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                  <NavItem>
                    <NavLink to="/game" activeClassName="active" tag={RRNavLink}>Game</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/how-to-play" activeClassName="active" tag={RRNavLink}>Tutorial</NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Misc
                </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        <NavLink to="/get-involved" activeClassName="active" tag={RRNavLink}>Get Involved</NavLink>
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                        Contact
                  </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        </div>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/game" component={Game} />
            <Route path="/how-to-play" component={HowToPlay} />
            <Route path="/get-involved" component={GetInvolved} />
          </Switch>
        </div>
      </HashRouter>
    </div>
  );
}

export default Main;