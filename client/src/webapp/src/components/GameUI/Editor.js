import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import TileInfo from './TileInfo'
import { gameSize, infoTypeToIndex, typeToInt } from "../../constants/Constants";

// /{this.props.tileInfo.x}

class Editor extends Component {
    constructor(props){
        super(props)
        this.tileInfoElement = React.createRef();
        this.state = { tileCoordinate : {x:0,y:0}, info: [6] };
    }

    setTileInfo = (x,y,info) => {
        this.setState( {tileCoordinate: {x:x,y:y}, info: info })
        this.tileInfoElement.current.setTileInfo(x,y,info)
    }

    createWall = () => {
        //confirmation popup
        //send contract
        //update locally if contract sent
        this.props.atlas[this.state.tileCoordinate.x+gameSize/2][this.state.tileCoordinate.y+gameSize/2][0] = typeToInt.WALL
        this.props.updateParent()
        //specifiy construction in progress
    }

    createFarm = () => {
        //confirmation popup
        //send contract
        this.props.atlas[this.state.tileCoordinate.x+gameSize/2][this.state.tileCoordinate.y+gameSize/2][0] = typeToInt.FARM
        this.props.updateParent()
    }

    createArmy = () => {
        //confirmation popup
        //send contract
        this.props.atlas[this.state.tileCoordinate.x+gameSize/2][this.state.tileCoordinate.y+gameSize/2][0] = typeToInt.FRIENDLY_ARMY
        this.props.updateParent()
    }

    divestTile = () => {
        //confirmation popup
        //send contract
        this.props.atlas[this.state.tileCoordinate.x+gameSize/2][this.state.tileCoordinate.y+gameSize/2][0] = typeToInt.EMPTY
        this.props.updateParent()
    }

    render() {
      return (
        <div className="colC">
          <Button variant="contained" disabled={this.state.info[infoTypeToIndex.TILE_TYPE]!=typeToInt.EMPTY} onClick={this.createWall}>
            Create Wall
          </Button>

          <Button variant="contained" disabled={this.state.info[infoTypeToIndex.TILE_TYPE]!=typeToInt.EMPTY} onClick={this.createFarm}>
            Create Farm
          </Button>

          <Button variant="contained" disabled={this.state.info[infoTypeToIndex.TILE_TYPE]!=typeToInt.EMPTY} onClick={this.createArmy}>
            Create Army
          </Button>

          <Button variant="contained" 
            disabled={this.state.info[infoTypeToIndex.TILE_TYPE]!=typeToInt.FARM 
                && this.state.info[infoTypeToIndex.TILE_TYPE]!=typeToInt.FRIENDLY_ARMY} 
            onClick={this.divestTile}>
            Divest
          </Button>

          <TileInfo ref={this.tileInfoElement} coordinate={this.state.tileCoordinate} info={this.state.info}/>
        </div>
      );
    }
  }
   
  export default Editor;