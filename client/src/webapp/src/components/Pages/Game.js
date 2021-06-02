import React, { Component } from "react";
import GameMap from "../GameMap/GameMap"
import Editor from "../GameUI/Editor"
import AltNavbar from "../Navbars/AltNavbar";

// reactstrap components
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


class Game extends Component {

  state = {
    dimensions: {
      width: 100,
      height: 100,
    },
    gameWidth: null,
    gameHeight: null
  };


  constructor(props) {
    super(props);
    console.log("Starting game page construction")

    this.editorElement = React.createRef();

    this.accounts = props.web3.accounts
    this.instance = props.web3.instance

    console.log("Game page constructed")
  }

  updateInfo = (info, neighbors) => {
    this.editorElement.current.setTileInfo(info, neighbors)
  }

  updateGameSize = (width, height) => {
    this.editorElement.current.setGameSize(width, height)
  }

  componentDidMount() {
    console.log("Game page mounted")
    this.setState({
      dimensions: {
        width: this.container.offsetWidth,
        height: this.container.offsetHeight,
      },
    });
  }

  render() {
    const { dimensions } = this.state;
    console.log("rendering game")


    return (
      <div className="game">
        <AltNavbar connectWeb3={this.props.connectWeb3} connected={this.props.connected} />
        <div className="main">
          <div className="section section-dark text-center">
            <Container>
              <Row>
                <Col md="10" className="ml-auto mr-auto">
                  <div className="item" ref={el => (this.container = el)}>
                    <GameMap
                      updateInfo={this.updateInfo}
                      updateGameSize={this.updateGameSize}
                      atlas={this.atlas}
                      width={dimensions.width}
                      web3={this.props.web3}
                      height={725}
                      updateParent={() => { this.forceUpdate() }}
                    />
                  </div>
                </Col>
                <Col md="2" className="ml-auto mr-auto">
                  <Editor ref={this.editorElement} updateParent={() => { this.forceUpdate() }} web3={this.props.web3} />
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;



/* Old Version Delete if successful

import React, { Component } from "react";
import GameMap from "../GameMap/GameMap"
import Editor from "../GameUI/Editor"
import AltNavbar from "../Navbars/AltNavbar";

// reactstrap components
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


class Game extends Component {

  state = {
    dimensions: {
      width: 100,
      height: 100,
    },
    gameWidth: null,
    gameHeight: null
  };


  constructor(props) {
    super(props);
    console.log("Starting game page construction")

    this.editorElement = React.createRef();

    this.accounts = props.web3.accounts
    this.instance = props.web3.instance

    console.log("Game page constructed")
  }

  updateInfo = (info, neighbors) => {
    this.editorElement.current.setTileInfo(info, neighbors)
  }

  updateGameSize = (width, height) => {
    this.editorElement.current.setGameSize(width, height)
  }

  componentDidMount() {
    console.log("Game page mounted")
    this.setState({
      dimensions: {
        width: this.container.offsetWidth,
        height: this.container.offsetHeight,
      },
    });
  }

  render() {
    const { dimensions } = this.state;
    console.log("rendering game")


    return (
      <>
        <AltNavbar connectWeb3={this.props.connectWeb3} connected={this.props.connected} />
        <div className='rowC'>
          <div className="item" ref={el => (this.container = el)}>
            <GameMap
              updateInfo={this.updateInfo}
              updateGameSize={this.updateGameSize}
              atlas={this.atlas}
              width={dimensions.width}
              web3={this.props.web3}
              height={725}
              updateParent={() => { this.forceUpdate() }}
            />
          </div>
          <Editor ref={this.editorElement} updateParent={() => { this.forceUpdate() }} web3={this.props.web3} />
        </div>
      </>
    );
  }
}

export default Game;



*/

