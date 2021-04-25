import React, { useCallback, useState} from 'react'

import { TileMap } from '../TileMap/TileMap'
import { Layer } from '../../lib/common'
import { Component } from 'react'
import { color, typeIntToTypeColor, gameSize} from "../../../webapp/src/constants/Constants"

const selected = []

function isSelected(x, y) {
  return selected.some(coord => coord.x === x && coord.y === y)
}

function isInBounds(x, y) {
  return (x >= -(gameSize/2) && x<(gameSize/2) && y >= -(gameSize/2) && y<(gameSize/2))
}

function select(x, y) {
  if (isInBounds(x,y)){
    selected.push({ x, y })
  }
}

function unselectAll() {
  selected.length = 0
}


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


class GameMap extends Component {
  constructor(props){
    super(props)
    this.getWorldMapData();
  }

  selectedLayer = (x, y) => {
    if (isSelected(x,y)){
      return  {color: color.SELECTED, scale: 1.2}
    }else{
      return null
    }
  }

  simpleLayer = (x, y) => {
    if (isInBounds(x,y)){
      return {
        color: typeIntToTypeColor[this.props.atlas[x + (gameSize/2)][y + (gameSize/2)][0]]
      }
    }else{
      return {
        color: color.OUT_OF_BOUNDS
      }
    }
  }

  /* //construction
  localLayer = (x, y) => {
    if (isInBounds(x,y)){
      return {
        color: typeIntToTypeColor[this.props.atlas[x + (gameSize/2)][y + (gameSize/2)]]
      }
    }else{
      return {
        color: color.OUT_OF_BOUNDS
      }
    }
  }*/

  async getWorldMapData() {
    var i
    var j
    for (i=0;i<gameSize;i++){
      for (j=0;j<gameSize;j++){
        this.props.atlas[i][j] = [getRandomInt(6),0];
      }
    }
  }

  handleClick(x,y,ctrlKey,shiftKey){
    if (shiftKey){

    }else if(ctrlKey){
      select(x,y);
    }else{
      unselectAll();
      select(x,y);
    }
  }

  render(
    ) {
      return (
        <div>
          <TileMap
            layers={[this.simpleLayer,this.selectedLayer]} 
            onClick={(x,y,ctrlKey,shiftKey) => {this.props.onClick(x,y); this.handleClick(x,y,ctrlKey,shiftKey) } }
            minX={-1.5*gameSize}
            maxX={1.5*gameSize}
            minY={-1.5*gameSize}
            maxY={1.5*gameSize}
            width ={this.props.width}
            height = {this.props.height}
              />
        </div>
      );
    }
}
  
export default GameMap
