import React, { Component } from "react";
import GameMap from "../../../../tilemap/components/GameMap/GameMap"
import Editor from "../GameUI/Editor"
import { gameSize } from "../../constants/Constants"


function uniform(r,c,v) {
  return Array.from(Array(r), _ => Array(c).fill(v));
}

class Game extends Component {
  state = {
    dimensions: {
      width: 100,
      height: 100,
    },
  };
  constructor(props) {
    super(props);
    this.editorElement = React.createRef();
    this.atlas = uniform(gameSize,gameSize,[6,0])
  }

  onClick = (x,y) => {
    const posX = x + (gameSize/2)
    const posY = y + (gameSize/2)
    if (posX >= 0 && posX<gameSize && posY >= 0 && posY<gameSize){
      this.editorElement.current.setTileInfo(x,y,this.atlas[posX][posY])
    }
  };

  componentDidMount() {
    this.setState({
      dimensions: {
        width: this.container.offsetWidth,
        height: this.container.offsetHeight,
      },
    });
  }
  
  render() {
    const { dimensions } = this.state;
    return (
      <div className='rowC'>
        <div className="item" ref={el => (this.container = el)}>
          <GameMap onClick={this.onClick} atlas={this.atlas} width={dimensions.width} height={725}/>
        </div>
        <Editor ref={this.editorElement} atlas={this.atlas} updateParent={()=>{this.forceUpdate()}}/>
      </div>
    );
  }
}

export default Game;


