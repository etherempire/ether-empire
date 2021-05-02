import React from 'react'

import { TileMap } from '../TileMap/TileMap'

import { Component } from 'react'

import { Atlas } from "../../../webapp/src/components/TileInfo/Atlas"

const selected = []
const selectedColor = "#FFFFFF80" //white highlight
const unloadedColor = "#FF00FF" //magneta
const outOfBoundsColor = "#000000" //black



class GameMap extends Component {
  constructor(props){
    super(props)
    this.state = {}

    console.log("constructing game map")
    const { web3, accounts, instance} = props.web3
    this.web3 = web3
    this.accounts = accounts
    this.instance = instance //GameWorld contract instance

    this.updateInfo = this.props.updateInfo
    this.getWorldMapData();

    this.tileMap = React.createRef();

  }

  isSelected = (x, y) => {
    return selected.some(coord => coord.x === x && coord.y === y)
  }

  selectedLayer = (x, y) => {
    if (this.isSelected(x,y)){
      return  {color: selectedColor, scale: 1.2}
    }else{
      return null
    }
  }

  isInBounds = (x, y) => {
    return (x >= -(this.gameWidth/2) && x<(this.gameWidth/2) && y >= -(this.gameHeight/2) && y<(this.gameHeight/2))
  }
  
  select = (x, y) => {
    if (this.isInBounds(x,y)){
      selected.push({ x, y })
      
      this.updateInfo(this.state.atlas.info(x+this.gameWidth/2,y+this.gameHeight/2))
    }
  }
  
  unselectAll = () => {
    selected.length = 0
  }

  simpleLayer = (x, y) => {
    if (this.isInBounds(x,y)){

      const posX = x + (this.gameWidth/2)
      const posY = y + (this.gameHeight/2)

      if (this.state.atlas ){
        
        const info = this.state.atlas.info(posX,posY)

        if (info){

          return {
            color: info.tileColor(),
          }
          
        }else{

          return {
            color: unloadedColor,
          }

        }

      }else{
        // should not be here
      }
        
    }else{
      return {
        color: outOfBoundsColor
      }
    }
  }

  armyLayer = (x, y) => {
    if (this.isInBounds(x,y)){
      const posX = x + (this.gameWidth/2)
      const posY = y + (this.gameHeight/2)

      if (this.state.atlas ){
        
        const info = this.state.atlas.info(posX,posY)

        if (info){
          if (info.containsArmy){
            return {
              color: info.armyColor(),
              scale: .75
            }
          }
          
        }else{

          return {
            color: unloadedColor,
          }

        }

      }else{
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

    this.gameWidth = await this.instance.methods.map_width().call({from: this.accounts[0], gasLimit: 1000000})
    this.gameHeight = await this.instance.methods.map_height().call({from: this.accounts[0], gasLimit: 1000000})

    this.props.updateGameSize(this.gameWidth,this.gameHeight)

    console.log("game width: "+this.gameWidth)
    console.log("game height: "+this.gameHeight)

    const atlasInProgress = new Atlas(this.gameWidth,this.gameHeight)

    this.setState({ atlas: atlasInProgress });

    const mapArea = this.gameHeight*this.gameWidth

    for (i=0;i<this.gameHeight;i++){
      for (j=0;j<this.gameWidth;j++){
        const isTile = await this.instance.methods.allEntities(curIndex).call({from: this.accounts[0]})//.onError((e) => {console.log(e)})
        const tileType = await this.instance.methods.allEntities(mapArea+curIndex).call({from: this.accounts[0]})//.onError((e) => {console.log(e)})

        curTile = atlasInProgress.info(j,i)
        curTile.isTile = isTile
      
        if(curTile.isTile){
          if(tileType.entityType == 1){
              //wall
              curTile.isWall = true
              curTile.isEmpty = false
          }else if(tileType.entityType == 3){
              //farm
              curTile.isFarm = true
              curTile.isEmpty = false
          }
        }
        this.setState({ atlas: atlasInProgress });
        this.props.updateParent()
        curIndex+=1

      }
    } 

    var moreEntities = false // will change upon looking for more entities
    while(moreEntities){

      //const curEntity = await this.instance.methods.allEntities(curIndex).call({from: this.accounts[0]}).onError(moreEntities=false)

      //record entity data in atlas

      curIndex += 1
    }
    this.setState({ atlas: atlasInProgress });
    console.log("finished getting world map data")

  }

  handleClick(x,y,ctrlKey,shiftKey){
    if (shiftKey){

    }else if(ctrlKey){
      this.select(x,y);
    }else{
      this.unselectAll();
      this.select(x,y);
    }
  }

  render(
    ) {
      if (this.state.atlas){
        return (
          <div>
            <TileMap
              ref={this.tileMap}
              layers={[this.simpleLayer,this.armyLayer,this.selectedLayer]} 
              onClick={(x,y,ctrlKey,shiftKey) => { this.handleClick(x,y,ctrlKey,shiftKey) } }
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
