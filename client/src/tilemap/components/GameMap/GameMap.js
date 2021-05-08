import React from 'react'

import { TileMap } from '../TileMap/TileMap'

import { Component } from 'react'

import { Atlas } from "../../../webapp/src/components/TileInfo/Atlas"

var selected = new Set([]) // set of coords
const selectedColor = "#FFFF00" //yellow
const unloadedColor = "#FF00FF" //magneta
const outOfBoundsColor = "#000000" //black



class GameMap extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    console.log("constructing game map")
    const { web3, accounts, instance } = props.web3
    this.web3 = web3
    this.accounts = accounts
    this.instance = instance //EtherEmpireWorld contract instance

    this.updateInfo = this.props.updateInfo
    console.log("ACCOUNTS LENGTh", this.accounts.length);
    if (this.accounts.length != 0) {
      this.getWorldMapData();
    }


    this.tileMap = React.createRef();

  }

  select = (x, y) => {
    if (this.isInBounds(x,y)){
      selected.add(`${x}_${y}`);      
      this.updateInfo(this.state.atlas.info(x+this.gameWidth/2,y+this.gameHeight/2), this.state.atlas)
    }
  }

  unselect = (x,y) => {
    selected.delete(`${x}_${y}`)
  }

  unselectAll = () => {
    selected.clear()
  }

  isSelected = (x, y) => {
    return selected.has(`${x}_${y}`)
  }

  isInBounds = (x, y) => {
    return (x >= -(this.gameWidth/2) && x<(this.gameWidth/2) && y >= -(this.gameHeight/2) && y<(this.gameHeight/2))
  }

  toggleSelection = (x, y) => {
    if (this.isSelected(x,y)){
      this.unselect(x,y)
    }else{
      this.select(x,y)
    }
  }

  selectRange = (x1, y1, x2, y2) => {
    if (this.isInBounds(x1,y1) && this.isInBounds(x2,y2)){

      var x
      var y
      for(x=Math.min(x1,x2);x<=Math.max(x1,x2);x++){
        for(y=Math.min(y1,y2);y<=Math.max(y1,y2);y++){
          this.select(x,y)
        }
      }
    }
  }

  

  selectedLayer = (x, y) => {
      const isSelected = this.isSelected(x,y)
      return  {
        color: isSelected ? "#ffffff30":"#00000000", //transparent
        outlineLeft: isSelected && !this.isSelected(x-1,y),
        outlineTop: isSelected && !this.isSelected(x,y+1),
        outlineRight: isSelected && !this.isSelected(x+1,y),
        outlineBottom: isSelected && !this.isSelected(x,y-1),
        outlineTopLeft: isSelected && !this.isSelected(x-1,y+1),
        outlineBottomLeft: isSelected && !this.isSelected(x-1,y-1),
        outlineTopRight: isSelected && !this.isSelected(x+1,y+1),
        outlineBottomRight: isSelected && !this.isSelected(x+1,y-1),
        
        outlineColor: selectedColor,
        outlineWidth: .1 // 1/10 of tile size
      }

  }
  
  handleClick(x,y,ctrlKey,shiftKey){
    if (shiftKey){

    }else if(ctrlKey){
      this.toggleSelection(x,y);
    }else{
      this.unselectAll();
      this.select(x,y);
    }
  }

  handleDrag(x1,y1,x2,y2,ctrlKey,shiftKey){
    if (shiftKey){
      if (!ctrlKey){
        this.unselectAll()
      }
      this.selectRange(x1,y1,x2,y2)
    }
  }

  simpleLayer = (x, y) => {
    if (this.isInBounds(x, y)) {

      const posX = x + (this.gameWidth / 2)
      const posY = y + (this.gameHeight / 2)

      if (this.state.atlas) {

        const info = this.state.atlas.info(posX, posY)

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

  armyLayer = (x, y) => {
    if (this.isInBounds(x, y)) {
      const posX = x + (this.gameWidth / 2)
      const posY = y + (this.gameHeight / 2)

      if (this.state.atlas) {

        const info = this.state.atlas.info(posX, posY)

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

  componentDidMount() {
    console.log("Game map mounted")
  }

  async getWorldMapData() {
    console.log("getting world map data")
    var i
    var j
    var curIndex = 0
    var curTile

    console.log("GAMEMAP INSTANCE", this.instance);
    this.gameWidth = await this.instance.methods.map_width().call({ from: this.accounts[0], gasLimit: 1000000 })
    this.gameHeight = await this.instance.methods.map_height().call({ from: this.accounts[0], gasLimit: 1000000 })

    this.props.updateGameSize(this.gameWidth, this.gameHeight)

    console.log("game width: " + this.gameWidth)
    console.log("game height: " + this.gameHeight)

    const atlasInProgress = new Atlas(this.gameWidth, this.gameHeight)

    this.setState({ atlas: atlasInProgress });

    const mapArea = this.gameHeight * this.gameWidth

    for (i = 0; i < this.gameHeight; i++) {
      for (j = 0; j < this.gameWidth; j++) {
        const isTile = await this.instance.methods.allEntities(curIndex).call({ from: this.accounts[0] })//.onError((e) => {console.log(e)})
        const tileType = await this.instance.methods.allEntities(mapArea + curIndex).call({ from: this.accounts[0] })//.onError((e) => {console.log(e)})

        curTile = atlasInProgress.info(j, i)
        curTile.isTile = isTile
      
        if(curTile.isTile){
          curTile.modifier = isTile.qualifier2
          if(tileType.entityType == 2){
              //wall
              curTile.isWall = true
              curTile.isEmpty = false
              //curTile.value = tileType.qualifier2
          }else if(tileType.entityType == 4){
              //farm
              curTile.isFarm = true
              curTile.isEmpty = false
              //curTile.value = tileType.qualifier2
          }
        }
        this.setState({ atlas: atlasInProgress });
        this.props.updateParent()
        curIndex += 1

      }
    }

    var moreEntities = false // will change upon looking for more entities
    while (moreEntities) {

      const curEntity = await this.instance.methods.allEntities(curIndex).call({from: this.accounts[0]})
      
      if (!curEntity){
        moreEntities = false
        break
      }
      //record entity data in atlas

      var armyTile = atlasInProgress.info(curEntity.locx, curEntity.locy)
      armyTile.containsArmy = true


      curIndex += 1
    }
    this.setState({ atlas: atlasInProgress });
    console.log("finished getting world map data")

  }

  render() {
    if (this.state.atlas){
      return (
        <div>
          <TileMap
            ref={this.tileMap}
            layers={[this.simpleLayer,this.armyLayer,this.selectedLayer]} 
            onClick={(x,y,ctrlKey,shiftKey) => { this.handleClick(x,y,ctrlKey,shiftKey) } }
            onMouseDrag={(x1,y1,x2,y2,ctrlKey,shiftKey) => {this.handleDrag(x1,y1,x2,y2,ctrlKey,shiftKey)}  }
            minX={-1.5*this.gameWidth}
            maxX={1.5*this.gameWidth}
            minY={-1.5*this.gameHeight}
            maxY={1.5*this.gameHeight}
            gameWidth={this.gameWidth}
            gameHeight={this.gameHeight}
            width ={this.props.width}
            height = {this.props.height}
              />
        </div>
      );
    }else{
      return (<div><p>Loading empires from blockchain...</p></div>)
    }
  }
}

export default GameMap
