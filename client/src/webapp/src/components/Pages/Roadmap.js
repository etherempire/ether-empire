import React from "react";
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

import AltNavbar from "../Navbars/AltNavbar";
import "../CSS/Roadmap.css";

function Roadmap(props) {
  return (
    <>
      <AltNavbar connectWeb3={props.connectWeb3} connected={props.connected} />
      <div className="roadmap__container">
        <div className="roadmap">
          <br />
          <h1> Ether Empire Roadmap</h1><br /><br />
        
        <h2>ETHGlobal Scaling Ethereum Hackathon</h2>
            <p>This Hackathon focused on layer 2 etherum solutions such as polygon/matic and skale. 
              During this hackathon, the core Ether Empire team was created, concepts and mission were established, and 
              the development of the game was started.
              At the conclusion of the hackathon, the project was sucessful in achieving a winning prize presented by SKALE!
              The project's submission materials can be viewed at the following 
              link: <a href="https://showcase.ethglobal.co/scaling/ether-empire">EtherEmpireEthGlobal</a>.</p>
        <br/>
        <h2>Current Development</h2>
            <p>Currently there's a few tasks at hand:</p>
            <ol>
            <li> Concept Brainstorm: <a href="https://etherempireofficial.gitbook.io/ether-empire/">EtherEmpireWhitepaper</a></li>
            <li> Comapany Formation underway</li>
            <li> Seed Funding and Investors being sought out; reach out to etherempireofficial@gmail.com for more information on getting involved!</li>
            <li> Testnet deployment (Q3 2021)</li>
            </ol><br />
      </div></div>

    </>
  );

}
export default Roadmap;

