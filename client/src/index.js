import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import App from './App';

// css styles - personal
import './index.css';

// css styles - bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

// css styles - template(Creative Tim) (CAN BE FOUND IN client/src/webapp/src/assets/css)
import "./webapp/src/assets/css/paper-kit.css";
import "./webapp/src/assets/demo/demo.css";

// import "./webapp/src/assets/scss/paper-kit.scss";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();










/*   PLAYING AROUND - DELETE LATER
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
// pages
import App from './App';
import Home from "./webapp/src/components/Pages/Home";
import Game from "./webapp/src/components/Pages/Game";
import HowToPlay from "./webapp/src/components/Pages/HowToPlay";
import Main from "./webapp/src/components/Pages/Main";
*/


/*
<Switch>
  <Route exact path="/" component={() => <Home web3={props.web3} />} />
  <Route path="/game" component={() => !connected ? <div><p>looks like you still need to connect metamask</p></div> : <Game web3={props.web3} />} />
  <Route path="/how-to-play" component={() => <HowToPlay installed={props.installed} connected={props.connected} />} />
</Switch>
<App />
*/