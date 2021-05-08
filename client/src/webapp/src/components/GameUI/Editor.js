import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { TileInfo } from '../TileInfo/TileInfo';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import "./Editor.css"


class Editor extends Component {
  constructor(props) {
    super(props)
    this.tileInfoElement = React.createRef();
    this.state = { info: new TileInfo(null, null), userInputedStakeAmount: "", buttonSelected: null };

    this.web3 = props.web3.web3
    this.accounts = props.web3.accounts
    this.instance = props.web3.instance

    this.atlas = props.atlas

    this.updateParent = props.updateParent


  }

  setGameSize = (width, height) => {
    this.setState({ gameWidth: width, gameHeight: height })
  }

  setTileInfo = (info) => { //info is a current tile to be focused on
    this.setState({ info: info })
  }

  setSelectedTiles = (selected) => { //selected is an array of tileinfo
    this.setState({ selected: selected })
  }

  createWall = () => {
    //get stake value from user
    //const userInputedStakeAmount = 100
    //button "Build" -> popup "Are you sure?" -> 

    const posX = this.state.info.x
    const posY = this.state.info.y
    console.log("creating wall at " + posX + "," + posY)

    this.instance.methods.buildWall(posX, posY, this.state.userInputedStakeAmount).send({ from: this.accounts[0], gasLimit: 100000 })
      .on('error', (error) => { console.log('Error Submitting Task: ', error) }) //error should be indicated to user
      .then(() => {
        console.log("Transaction successful");

        this.state.info.isWall = true
        this.state.info.value = this.state.userInputedStakeAmount

        this.updateParent()
      })

    //specifiy construction in progress

  }

  createFarm = () => {
    //get stake value from user
    //const userInputedStakeAmount = 100

    //button "Build" -> popup "Are you sure?" -> 
    const posX = this.state.info.x
    const posY = this.state.info.y

    this.instance.methods.buildFarm(posX, posY, this.state.userInputedStakeAmount).send({ from: this.accounts[0], gasLimit: 100000 })
      .on('error', (error) => { console.log('Error Submitting Task: ', error) }) //error should be indicated to user
      .then(() => {
        console.log("Transaction successful");

        this.state.info.isFarm = true
        this.state.info.value = this.state.userInputedStakeAmount
        this.state.info.owner = this.accounts[0]

        this.updateParent()
      })


    //specifiy construction in progress

  }

  createArmy = () => {
    this.setState({ buttonSelected: "createArmy" });
    //get stake value from user
    //const userInputedStakeAmount = 100

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
    this.state.info.armyValue = this.state.userInputedStakeAmount
    this.state.info.armyOwner = this.accounts[0]

    this.updateParent()
    //specifiy construction in progress

  }

  divestFarm = () => {

    //button "Build" -> popup "Are you sure?" -> 
    const posX = this.state.info.x + this.gameWidth / 2
    const posY = this.state.info.y + this.gameHeight / 2

    this.instance.methods.divest(posX, posY).send({ from: this.accounts[0], gasLimit: 100000 })
      .on('error', (error) => { console.log('Error Submitting Task: ', error) }) //error should be indicated to user
      .then(() => {
        console.log("Transaction successful");

        this.state.info.isFarm = false

        this.state.info.value = 0
        this.state.info.owner = null

        this.updateParent()
      })

    //specifiy construction in progress
  }

  selectedWall = () => {   // if user selects the create Wall button, initialize the state
    const posX = this.state.info.x
    const posY = this.state.info.y
    console.log(posX, posY);
    if (posX == null || posY == null) {
      alert("please select a title first building a wall!")
    }
    else {
      this.setState({ buttonSelected: "createWall" });
    }
  }

  selectedFarm = () => {  // if user selects the create Farm button, initialize the state
    const posX = this.state.info.x
    const posY = this.state.info.y
    console.log(posX, posY);
    if (posX == null || posY == null) {
      alert("please select a title first before building a farm!")
    }
    else {
      this.setState({ buttonSelected: "createFarm" });
    }
  }

  selectedArmy = () => {    // if user selects the create Army button, initialize the state
    const posX = this.state.info.x
    const posY = this.state.info.y
    console.log(posX, posY);
    if (posX == null || posY == null) {
      alert("please select a title first before building an army!")
    }
    else {
      this.setState({ buttonSelected: "createArmy" });
    }
  }

  setUserStakeAmount = (e) => {
    this.setState({ userInputedStakeAmount: e.target.value });
  }

  confirmStake = async () => {
    if (this.state.userInputedStakeAmount == "" || this.state.userInputedStakeAmount <= 0) {  //invalid user input
      alert("invalid amount!");
    }
    else if (this.state.buttonSelected === "createWall") {
      await this.createWall();
      await this.setState({ buttonSelected: null });  //gets rid of user input section
    }
    else if (this.state.buttonSelected === "createFarm") {
      await this.createFarm();
      await this.setState({ buttonSelected: null });  //gets rid of user input section
    }
    else if (this.state.buttonSelected === "createArmy") {
      await this.createArmy();
      await this.setState({ buttonSelected: null });  //gets rid of user input section
    }
    else {
      alert("error confirming stake");
    }

    //clear state
    await this.setState({ userInputedStakeAmount: "" }) //reset user input
  }

  render() {
    return (
      <div className="colC">
        <Button variant="contained" disabled={!this.state.info.isEmpty} onClick={this.selectedWall}>
          Create Wall
        </Button>
        <Button variant="contained" disabled={!this.state.info.isEmpty} onClick={this.selectedFarm}>
          Create Farm
        </Button>
        <Button variant="contained" disabled={!this.state.info.isEmpty} onClick={this.selectedArmy}>
          Create Army
        </Button>
        <Button variant="contained"
          disabled={!this.state.info.isFarm} //only divest farm for now
          onClick={this.divestFarm}>
          Divest Farm
        </Button>
        {
          this.state.buttonSelected ? (
            <div className="userInput">
              <InputGroup >
                <Input placeholder="Amount" value={this.state.userInputedStakeAmount} onChange={this.setUserStakeAmount} required />
                <InputGroupAddon addonType="append">
                  <InputGroupText className="confirm" onClick={this.confirmStake}>Confirm</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </div>
          ) :
            <div></div>
        }
        <div className="infoText">
          <p>Tile Coords: ({this.state.info.x},{this.state.info.y})</p>
          <p>Tile modifier: {this.state.info.modifier}</p>
          <p>Tile Type: {this.state.info.tileType()}</p>

          <p>{this.state.info.value ? "Tile Value: " + this.state.info.value : null}</p>
          <p align="left">{this.state.info.owner ? "Tile Owner: " + this.state.info.owner : null}</p>


          <p>{this.state.info.armyValue ? "Army Value: " + this.state.info.armyValue : null}</p>
          <p align="left">{this.state.info.armyOwner ? "Army Owner: " + this.state.info.armyOwner : null}</p>
        </div>
      </div>
    )
  }
}


export default Editor;