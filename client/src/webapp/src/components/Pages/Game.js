import React, { Component } from "react";
import GameMap from "../GameMap/GameMap"
import Editor from "../GameUI/Editor"
import AltNavbar from "../Navbars/AltNavbar";


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


