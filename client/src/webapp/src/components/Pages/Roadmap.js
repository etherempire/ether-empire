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

function Roadmap(props) {
  return (
    <>
      <AltNavbar connectWeb3={props.connectWeb3} connected={props.connected} />
      <div className="main">
        <div className="section text-center">
          <br />
          <h1> Ether Empire Roadmap</h1>
        </div>
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
            <li> Whitepaper under development and found at <a href="https://etherempireofficial.gitbook.io/ether-empire/">EtherEmpireWhitepaper</a></li>
            <li> Comapany Formation underway</li>
            <li> Seed Funding and Investors being sought out; reach out to etherempireofficial@gmail.com for more information on getting involved!</li>
            <li> Game Development continues</li>
            </ol><br />
      </div>

    </>
  );

}
export default Roadmap;

