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
          This is the roadmap page
        </div>
        <div className="section section-dark text-center">

        </div>
      </div>

    </>
  );

}
export default Roadmap;

