import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { TileInfo } from '../TileInfo/TileInfo'


class Editor extends Component {
    constructor(props){
        super(props)
        this.tileInfoElement = React.createRef();
        this.state = { info: new TileInfo(null,null) };

        this.web3 = props.web3.web3
        this.accounts = props.web3.accounts
        this.instance = props.web3.instance

        this.atlas = props.atlas

        this.updateParent = props.updateParent
    }

    setGameSize = (width,height) => {
      this.setState( {gameWidth: width, gameHeight: height} )
    }

    setTileInfo = (info) => {
        this.setState( {info: info} )
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
        //specifiy construction in progress
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

          <Button variant="contained" 
            disabled={!this.state.info.isFarm} //only divest farm for now
            onClick={this.divestFarm}>
            Divest Farm
          </Button>

          <div className="infoText">
              <p>Tile Coords: ({this.state.info.x},{this.state.info.y})</p>
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