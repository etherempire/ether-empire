import React, { Component } from "react";
import { typeIntToTypeString } from "../../constants/Constants";
 
class TileInfo extends Component {
  constructor(props){
    super(props)
    this.state = {
        coordinate : this.props.coordinate,
        info: this.props.info,
        type: this.props.info[0]
    }
  }

  setTileInfo = (x,y,info) => {
    this.setState({
        coordinate: {x:x,y:y},
        info: info,
        type: info[0]
        })
  }

  render() {
    return (
      <div>
          <p>Tile Coords: ({this.state.coordinate.x},{this.state.coordinate.y})</p>
          <p>Tile Type: {typeIntToTypeString[this.state.type]}</p>
      </div>
    );
  }
}
 
export default TileInfo;