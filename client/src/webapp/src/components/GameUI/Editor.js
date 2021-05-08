import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { TileInfo } from '../TileInfo/TileInfo'


const direction = {
  NORTH: 1, SOUTH: 2, EAST: 3, WEST: 4
}

class Editor extends Component {
    constructor(props){
        super(props)
        this.tileInfoElement = React.createRef();
        this.state = { info: new TileInfo(null,null), atlas: null };

        this.web3 = props.web3.web3
        this.accounts = props.web3.accounts
        this.instance = props.web3.instance

        this.atlas = props.atlas

        this.updateParent = props.updateParent
    }

    setGameSize = (width,height) => {
      this.setState( {gameWidth: width, gameHeight: height} )
    }

    setTileInfo = (info, atlas) => { //info is a current tile to be focused on
        this.setState( {info: info, atlas: atlas} )
    }

    setSelectedTiles = (selected) => { //selected is an array of tileinfo
      this.setState( {selected: selected} )
    }

    createWall = () => {
        //get stake value from user
        const userInputedStakeAmount = 100

        //button "Build" -> popup "Are you sure?" -> 

        const posX = this.state.info.x
        const posY = this.state.info.y
        console.log("creating wall at "+posX+","+posY)
        
        this.instance.methods.buildWall(posX,posY,userInputedStakeAmount).send({from: this.accounts[0], gasLimit: 100000})
            .on('error', (error)=> {console.log('Error Submitting Task: ',error)}) //error should be indicated to user
            .then(() => {
                console.log("Transaction successful");

                this.state.info.isWall = true
                this.state.info.value = userInputedStakeAmount                

                this.updateParent()})
        
        //specifiy construction in progress
    }

    createFarm = () => {
        //get stake value from user
        const userInputedStakeAmount = 100

        //button "Build" -> popup "Are you sure?" -> 
        const posX = this.state.info.x
        const posY = this.state.info.y

        this.instance.methods.buildFarm(posX,posY,userInputedStakeAmount).send({from: this.accounts[0], gasLimit: 100000})
            .on('error', (error)=> {console.log('Error Submitting Task: ',error)}) //error should be indicated to user
            .then(() => {
                console.log("Transaction successful");

                this.state.info.isFarm = true
                this.state.info.value = userInputedStakeAmount         
                this.state.info.owner = this.accounts[0]

                this.updateParent()})
        
        //specifiy construction in progress
    }

    moveArmy = (dir) => {
      if(this.state.atlas!=null){

        const posX = this.state.info.x
        const posY = this.state.info.y
        var newPosX = posX
        var newPosY = posY

        if (dir == direction.NORTH){
          newPosY += 1
        }else if (dir == direction.SOUTH){
          newPosY -= 1
        }else if (dir == direction.EAST){
          newPosX += 1
        }else if (dir == direction.WEST){
          newPosX -= 1
        }else{
          return
        }

        var newInfo = this.state.atlas.info(newPosX, newPosY)
        newInfo.containsArmy = true
        newInfo.armyId = this.state.info.armyId
        newInfo.armyOwner = this.state.info.armyOwner
        newInfo.armyValue = this.state.info.armyValue

        this.state.info.containsArmy = false
        this.state.info.armyValue = 0       
        this.state.info.armyOwner = null

        this.updateParent()
        /*
        this.instance.methods.armyMove(this.state.info.armyId, this.state.info.x, this.state.info.y+1).send()
              .on('error', (error)=> {console.log('Error Submitting Task: ',error)}) //error should be indicated to user
              .then(() => {
                  console.log("Transaction successful");

                  this.state.info.isArmy = false
                  this.state.info.armyValue = 0       
                  this.state.info.armyOwner = null

                  this.updateParent()})
        */
      }
    }

    createArmy = () => {
        //get stake value from user
        const userInputedStakeAmount = 100

        //button "Build" -> popup "Are you sure?" -> 
        const posX = this.state.info.x
        const posY = this.state.info.y

        /*        
        this.instance.methods.buildArmy(posX,posY,userInputedStakeAmount).send({from: this.accounts[0], gasLimit: 100000})
            .on('error', (error)=> {console.log('Error Submitting Task: ',error)}) //error should be indicated to user
            .then(() => {
                console.log("Transaction successful");

                this.state.info.containsArmy = true
                this.state.info.armyValue = userInputedStakeAmount         
                this.state.info.armyOwner = this.accounts[0]

                this.updateParent()})
        */
        this.state.info.containsArmy = true
        this.state.info.armyValue = userInputedStakeAmount         
        this.state.info.armyOwner = this.accounts[0]

        this.updateParent()
    }

    divestFarm = () => {

        //button "Build" -> popup "Are you sure?" -> 
        const posX = this.state.info.x+this.gameWidth/2
        const posY = this.state.info.y+this.gameHeight/2

        this.instance.methods.divest(posX,posY).send({from: this.accounts[0], gasLimit: 100000})
            .on('error', (error)=> {console.log('Error Submitting Task: ',error)}) //error should be indicated to user
            .then(() => {
                console.log("Transaction successful");

                this.state.info.isFarm = false

                this.state.info.value = 0      
                this.state.info.owner = null

                this.updateParent()})
        
        //specifiy construction in progress
    }

    render() {
      return (
        <div className="colC">
          <Button variant="contained" disabled={!this.state.info.isEmpty} onClick={this.createWall}>
            Create Wall
          </Button>

          <Button variant="contained" disabled={!this.state.info.isEmpty} onClick={this.createFarm}>
            Create Farm
          </Button>

          <Button variant="contained" disabled={!this.state.info.isEmpty} onClick={this.createArmy}>
            Create Army
          </Button>

          <Button variant="contained" disabled={!this.state.info.containsArmy} onClick={this.moveArmy(direction.NORTH)}>
            Move Army
          </Button>

          <Button variant="contained" 
            disabled={!this.state.info.isFarm} //only divest farm for now
            onClick={this.divestFarm}>
            Divest Farm
          </Button>

          <div className="infoText">


              <p>Tile Coords: ({this.state.info.x},{this.state.info.y})</p>
              <p>Tile modifier: {this.state.info.modifier}</p>
              <p>Tile Type: {this.state.info.tileType()}</p>

              <p>{this.state.info.value ? "Tile Value: "+this.state.info.value : null}</p>
              <p align="left">{this.state.info.owner ? "Tile Owner: "+this.state.info.owner : null}</p>


              <p>{this.state.info.armyValue ? "Army Value: "+this.state.info.armyValue : null}</p>
              <p align="left">{this.state.info.armyOwner ? "Army Owner: "+this.state.info.armyOwner : null}</p>

          </div>

        </div>
      );

    }
  }
   
  export default Editor;