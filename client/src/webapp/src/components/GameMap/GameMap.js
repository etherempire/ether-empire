import React from 'react'
import { TileMap } from '../../../../tilemap/components/TileMap/TileMap'
import { Component } from 'react'
import { Atlas } from "../TileInfo/Atlas"
import { GameLoader } from './GameLoader'
import { GameSelector } from './GameSelector'


const selectedColor = "#FFFF00" //yellow
const unloadedColor = "#FF00FF" //magneta
const outOfBoundsColor = "#000000" //black


// creates layers + tilemap
class GameMap extends Component {
  
  constructor(props) {
    super(props)
    this.state = {updates: 0}
    this.updateInfo = props.updateInfo

    this.selector = new GameSelector(
      this.isInBounds,
      this.updateFocusedTile
      )

    this.gameLoader = new GameLoader(
      this.props.web3,
      (width,height) => {
        this.gameWidth=width; 
        this.gameHeight=height;
        this.selector.gameWidth = width;
        this.selector.gameHeight = height;
      },
      (atlas)=>{this.atlas = atlas; this.update()}
    )

    // ref to tileMap to update tileMap
    this.tileMap = React.createRef();

  }

  updateFocusedTile = (x,y) => {
    this.updateInfo(this.atlas.info(x,y), 
          { NORTH: this.atlas.info(x,y+1),
            SOUTH: this.atlas.info(x,y-1),
            EAST: this.atlas.info(x+1,y),
            WEST: this.atlas.info(x-1,y)})
  }
  
  isInBounds(x, y){
    if (!this.gameWidth || !this.gameHeight){
      return false
    }
    return (x >= -(this.gameWidth / 2) && x < (this.gameWidth / 2) && y >= -(this.gameHeight / 2) && y < (this.gameHeight / 2))
  }

  update(){
    this.setState({updates: this.state.updates+1})
  }

  handleClick(x, y, ctrlKey, shiftKey) {
    this.selector.handleClick(x,y,ctrlKey,shiftKey)
  }
  handleDrag(x1, y1, x2, y2, ctrlKey, shiftKey) {
    this.selector.handleDrag(x1, y1, x2, y2, ctrlKey, shiftKey)
  }

  // empty, farm, wall, out of bounds
  baseLayer = (x, y) => {
    if (this.isInBounds(x, y)) {
      const posX = x + (this.gameWidth / 2)
      const posY = y + (this.gameHeight / 2)
      if (this.atlas) {
        const info = this.atlas.info(posX, posY)
        if (info) {
          return {
            color: info.tileColor(),
          }
        } else {
          return {
            color: unloadedColor,
          }
        }
      } else {
        // should not be here
      }
    } else {
      return {
        color: outOfBoundsColor
      }
    }
  }

  // army
  armyLayer = (x, y) => {
    if (this.isInBounds(x, y)) {
      const posX = x + (this.gameWidth / 2)
      const posY = y + (this.gameHeight / 2)
      if (this.atlas) {
        const info = this.atlas.info(posX, posY)
        if (info) {
          if (info.containsArmy) {
            return {
              color: info.armyColor(),
              scale: .75
            }
          }
        } else {
          return {
            color: unloadedColor,
          }
        }
      } else {
        // should not be here
      }
    }
  }

  //selection
  selectedLayer = (x, y) => {
    const isSelected = this.selector.isSelected(x, y)
    return {
      color: isSelected ? "#ffffff30" : "#00000000",
      outlineLeft: isSelected && !this.selector.isSelected(x - 1, y),
      outlineTop: isSelected && !this.selector.isSelected(x, y + 1),
      outlineRight: isSelected && !this.selector.isSelected(x + 1, y),
      outlineBottom: isSelected && !this.selector.isSelected(x, y - 1),
      outlineTopLeft: isSelected && !this.selector.isSelected(x - 1, y + 1),
      outlineBottomLeft: isSelected && !this.selector.isSelected(x - 1, y - 1),
      outlineTopRight: isSelected && !this.selector.isSelected(x + 1, y + 1),
      outlineBottomRight: isSelected && !this.selector.isSelected(x + 1, y - 1),

      outlineColor: selectedColor,
      outlineWidth: .1
    }
  }

  componentDidMount() {
    console.log("Game map mounted")
  }

  render() {
    if (this.atlas != null) {
      return (
        <div>
          <TileMap
            ref={this.tileMap}
            layers={[this.baseLayer, this.armyLayer, this.selectedLayer]}
            onClick={(x, y, ctrlKey, shiftKey) => { this.handleClick(x, y, ctrlKey, shiftKey) }}
            onMouseDrag={(x1, y1, x2, y2, ctrlKey, shiftKey) => { this.handleDrag(x1, y1, x2, y2, ctrlKey, shiftKey) }}
            minX={-5 * this.gameWidth}
            maxX={.5 * this.gameWidth}
            minY={-.5 * this.gameHeight}
            maxY={.5 * this.gameHeight}
            width={this.props.width}
            height={this.props.height}
          />
        </div>
      );
    } else {
      return (<div><p>Loading empires from blockchain...</p></div>)
    }
  }
}

export default GameMap
