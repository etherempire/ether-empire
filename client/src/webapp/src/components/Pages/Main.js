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
import GetInvolved from "./GetInvolved";
import logo from "../Images/ether-empire-logo.png";
import "../CSS/Main.css";
import CheckIcon from '@material-ui/icons/Check';
import getWeb3 from "../../../../getWeb3";
import GameWorldContract from "../../../../contracts/GameWorld.json"

/* Navigation bar */

const Main = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="main">
      <HashRouter>
        <div className="navigation-bar-container">
          <Navbar color="light" light expand="xl">
            <NavLink exact to="/" activeClassName="active" tag={RRNavLink}><img className="navigation-logo" src={logo}></img></NavLink>
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
                      <NavLink href="">Discord</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
              {
                props.web3.accounts.length == 0 ?
                  <Button color="warning" className="connectAccountButton" onClick={props.connectAccount}>Connect Account</Button>
                  : <Button color="warning" className="connectAccountButton"><span className="connected"><span>Connected</span> <CheckIcon className="checkmark" /></span> </Button>
              }
            </Collapse>
          </Navbar>

        </div>
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/game" component={() => <Game web3={props.web3} />} />
            <Route path="/how-to-play" component={HowToPlay} />
          </Switch>
        </div>
      </HashRouter>
    </div>
  );
}

export default Main;







/*  TESTING
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [instance, setInstance] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  */

/* Code inside the useEffect hook is used to persist state after reload */
/*
useEffect(() => {   // runs after component renders
  console.log("USEFFECT RUNNING")
  const getIsConnected = sessionStorage.getItem("isConnected");  //get from sessionStorage
  if (getIsConnected) {
    connectAccount();
  }
}, []);
*/

/* Create web3, get accounts, create contract instance */
/*
const connectAccount = async () => {
  try {
    // Get network provider and web3 instance.
    const web3 = await getWeb3();
    setWeb3(web3);  // set web3 state

    // Use web3 to get the user's accounts.
    const accounts = await web3.eth.getAccounts();
    console.log("accounts", accounts);
    setAccounts(accounts);  //set accounts state

    // Get the contract instance.
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = GameWorldContract.networks[networkId];
    const instance = new web3.eth.Contract(
      GameWorldContract.abi,
      deployedNetwork && deployedNetwork.address,
    );
    setInstance(instance);  //set instance state

    setIsConnected(true);   //set isConnected state
    sessionStorage.setItem('isConnected', "true");   // use localStorage to persist state

  } catch (error) {
    // Catch any errors for any of the above operations.
    alert(
      `Failed to load web3, accounts, or contract. Check console for details.`,
    );
    console.error(error);
  }
}
 */