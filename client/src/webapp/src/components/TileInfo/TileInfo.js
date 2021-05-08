import React, { Component } from "react";

export const color = {
  EMPTY: "#d3d3d3", //light grey
  FARM: "#228B22", //green
  WALL: "#282828", //grey
  ENEMY_ARMY: "#8b0000", //red
  FRIENDLY_ARMY: "#000080", //blue
  OUT_OF_BOUNDS: "#000000", //black
  UNLOADED: "#FF00FF", //magneta
  SELECTED: "#FFFFFF80" //white highlight
}

export class TileInfo {

    constructor(x, y){
        this.x = x
        this.y = y

        this.isTile = false
        this.modifier = 0

        this.isEmpty = true
        this.isFarm = false
        this.isWall = false

        this.armyId = null

        this.value = 0
        this.owner = null

        this.containsArmy = false
        this.armyOwner = null
        this.armyValue = 0

        this.isPlayer = false
        this.isPlayerArmy = false

    }

    tileColor() {
      if(this.isFarm){
        return color.FARM
      }else if(this.isWall){
        return color.WALL
      }else if(this.isTile){
        return color.EMPTY
      }else{
        return color.OUT_OF_BOUNDS
      }
    }

    armyColor(){
      if(this.containsArmy){
        return color.FRIENDLY_ARMY
      }
    }

    tileType() {
      if(this.isFarm){
        return "Farm"
      }else if(this.isWall){
        return "Wall"
      }else if(this.isTile){
        return "Empty"
      }else{
        return "Not a tile"
      }
    }

}