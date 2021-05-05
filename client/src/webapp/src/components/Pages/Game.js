import React, { Component } from "react";
import GameMap from "../../../../tilemap/components/GameMap/GameMap"
import Editor from "../GameUI/Editor"

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
    console.log("props in game page", props);
    console.log("Starting game page construction")

    this.editorElement = React.createRef();

    this.accounts = props.web3.accounts
    this.instance = props.web3.instance

    console.log("Game page constructed")
  }

  updateInfo = (info) => {
    this.editorElement.current.setTileInfo(info)
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
    );
  }
}

export default Game;


