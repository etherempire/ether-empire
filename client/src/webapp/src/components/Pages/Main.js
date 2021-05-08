import React, { useState, useEffect } from 'react';
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
  NavbarText,
  Button
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
import logo from "../Images/ether-empire-logo.png";
import navLogo from "../Images/logo_64x64.png"
import "../CSS/Main.css";
import CheckIcon from '@material-ui/icons/Check';
import getWeb3 from "../../../../getWeb3";

/* Navigation bar */

const Main = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const connected = props.connected
  const installed = props.installed

  return (
    <div className="main">
      <HashRouter>
        <div className="navigation-bar-container">
          <Navbar color="light" light expand="xl">
            <NavLink exact to="/" activeClassName="active" tag={RRNavLink}><img className="navigation-logo" src={navLogo}></img></NavLink>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink to="/game" activeClassName="active" tag={RRNavLink}>GAME</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/how-to-play" activeClassName="active" tag={RRNavLink}>TUTORIAL</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    CONTACT
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <NavLink href="https://github.com/jinhongkuan/ether-empire" target="_blank">GitHub</NavLink>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      <NavLink href="https://discord.com">Discord</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
              {
                !connected ?
                  <Button color="warning" className="connectAccountButton" onClick={props.connectWeb3}>Connect MetaMask</Button>
                  : <Button color="warning" className="connectAccountButton"><span className="connected"><span>Connected</span> <CheckIcon className="checkmark" /></span> </Button>
              }
            </Collapse>
          </Navbar>

        </div>
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/game" component={() => !connected ? <div><p>looks like you still need to connect metamask</p></div> : <Game web3={props.web3}/>} />
            <Route path="/how-to-play" component={() => <HowToPlay installed={props.installed} connected={props.connected}/>} />
          </Switch>
        </div>
      </HashRouter>
    </div>
  );
}

export default Main;
