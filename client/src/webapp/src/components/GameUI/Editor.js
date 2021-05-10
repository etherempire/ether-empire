import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { TileInfo } from '../TileInfo/TileInfo';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import "./Editor.css"

const direction = {
  NORTH: 0,
  SOUTH: 1,
  EAST: 2,
  WEST: 3
}

class Editor extends Component {
  constructor(props) {
    super(props)
    this.tileInfoElement = React.createRef();
    this.state = { info: new TileInfo(null, null), userInputedStakeAmount: "", buttonSelected: null };

    this.web3 = props.web3.web3
    this.accounts = props.web3.accounts
    this.instance = props.web3.instance
    this.tokenInstance = props.web3.tokenInstance

    this.atlas = props.atlas

    this.updateParent = props.updateParent

    // get user funds 
    this.checkSufficientBalance(0);

  }

  setGameSize = (width, height) => {
    this.setState({ gameWidth: width, gameHeight: height })
  }

  setTileInfo = (info, neighbors) => { //info is a current tile to be focused on + up to 4 neighboors
    this.setState({ info: info, neighbors: neighbors, buttonSelected: null, movingArmy: false })
  }

  createWall = () => {

    const posX = this.state.info.x
    const posY = this.state.info.y
    console.log("creating wall at " + posX + "," + posY)

    /*
    this.instance.methods.buildWall(posX, posY, this.state.userInputedStakeAmount).send({ from: this.accounts[0], gasLimit: 100000 })
      .on('error', (error) => { console.log('Error Submitting Task: ', error) }) //error should be indicated to user
      .then(() => {
        console.log("Transaction successful");

        this.state.info.isWall = true
        this.state.info.value = this.state.userInputedStakeAmount
        this.state.info.isEmpty = false

        this.updateParent()
      })
      */
      this.state.info.isWall = true
      this.state.info.value = this.state.userInputedStakeAmount
      this.state.info.isEmpty = false
      
      this.updateParent()

  }

  depositeERC20 = () => {
    this.tokenInstance.methods.approve(this.instance.options.address, this.state.userInputedStakeAmount) 
      .send({ from: this.accounts[0] })
      .on('error', (error) => { 
        console.log('Error depositing ERC20 tokens: ', error) 
        return false 
      }) //error should be indicated to user
      .then(() => {return true})
  }


  // verify user has approved sufficient funds to main contract, then continue with callback 
  checkSufficientBalance = async (amount) => {
    try {
        let allowance =  await this.tokenInstance.methods.allowance(this.accounts[0], this.instance.options.address).call({ from: this.accounts[0] })
        let balance = await this.tokenInstance.methods.balanceOf(this.accounts[0]).call({ from: this.accounts[0] })
        balance = Math.min(allowance, balance) // Ignore allowance that exceeds user balance 
        // update global variable 
        this.ERC20balance = balance

        if (balance < amount) 
        {
          // insufficient approved funds
          console.log(balance, amount);
          console.log('User has insufficient ERC20 balance'); 
          return false;
        }

        return true; 
    } catch(error) {
      console.log('Error checking for user ERC20 balance: ', error);
      return false;
    }
  }

createFarm = () => {

  const posX = this.state.info.x
  const posY = this.state.info.y


  const callback = (amount) => {
    this.instance.methods.buildFarm(posX, posY, amount)
      .send({ from: this.accounts[0]})
      .on('error', (error) => { console.log('Error Submitting Task: ', error) }) //error should be indicated to user
      .then(() => {
        console.log("Transaction successful");

        this.state.info.isFarm = true
        this.state.info.value = this.state.userInputedStakeAmount
        this.state.info.owner = this.accounts[0]
        this.state.info.isEmpty = false

        this.updateParent()
      })
  }

  const amount = this.state.userInputedStakeAmount; // necessary to lock the value so it doesnt get changed while the asynchronous function below is occuring  
  // this.checkSufficientBalance(amount).then( success => { console.log(success); if (success) callback(amount);});
  callback(amount);
  

}

createArmy = () => {
  this.setState({ buttonSelected: "createArmy" });
  const posX = this.state.info.x
  const posY = this.state.info.y

  // TODO: access backend

  this.state.info.containsArmy = true
  this.state.info.armyValue = this.state.userInputedStakeAmount
  this.state.info.armyOwner = this.accounts[0]

  this.updateParent()

}

divestFarm = () => {
  const posX = this.state.info.x
  const posY = this.state.info.y

  // TODO: access backend

  this.state.info.isFarm = false
  this.state.info.isEmpty = true
  this.state.info.value = 0
  this.state.info.owner = null

  this.updateParent()
}

pillageFarm = () => {
  // TODO: access backend
  this.state.info.value = 0
  this.state.info.isFarm = false
  this.state.info.isEmpty = true
  this.updateParent()
}

attackDirection = (dir) => {
  var neighbor
  if (dir == direction.NORTH) {
    neighbor = this.state.neighbors.NORTH
  } if (dir == direction.SOUTH) {
    neighbor = this.state.neighbors.SOUTH
  } if (dir == direction.EAST) {
    neighbor = this.state.neighbors.EAST
  } if (dir == direction.WEST) {
    neighbor = this.state.neighbors.WEST
  }

  if (this.canAttack(dir)) {
    // TODO: access backend
    neighbor.containsArmy = false
    neighbor.armyOwner = null
    neighbor.armyValue = 0
    this.updateParent()
  }

  this.setState({ isAttacking: false });
}

destroyDirection = (dir) => {
  var neighbor
  if (dir == direction.NORTH) {
    neighbor = this.state.neighbors.NORTH
  } if (dir == direction.SOUTH) {
    neighbor = this.state.neighbors.SOUTH
  } if (dir == direction.EAST) {
    neighbor = this.state.neighbors.EAST
  } if (dir == direction.WEST) {
    neighbor = this.state.neighbors.WEST
  }

  if (this.canDestroy(dir)) {
    neighbor.isWall = false
    neighbor.isEmpty = true
    neighbor.value = 0
    this.updateParent()
  }

  this.setState({ isDestroying: false });
}

moveArmy = (dir) => {   // if user selects the create Wall button, initialize the state
  console.log(dir)
  var neighbor
  if (dir == direction.NORTH) {
    neighbor = this.state.neighbors.NORTH
  } if (dir == direction.SOUTH) {
    neighbor = this.state.neighbors.SOUTH
  } if (dir == direction.EAST) {
    neighbor = this.state.neighbors.EAST
  } if (dir == direction.WEST) {
    neighbor = this.state.neighbors.WEST
  }

  if (this.canMove(dir)) {
    // TODO: access backend
    // move to neighbor.x, neighbor.y
    neighbor.containsArmy = true
    neighbor.armyOwner = this.state.info.armyOwner
    neighbor.armyValue = this.state.info.armyValue
    this.state.info.containsArmy = false
    this.state.info.armyOwner = null
    this.state.info.armyValue = 0
    this.updateParent()
  }

  this.setState({ movingArmy: false, buttonSelected: null })

}

selectedMoveArmy = () => {   // if user selects the create Wall button, initialize the state
  const posX = this.state.info.x
  const posY = this.state.info.y
  if (posX == null || posY == null) {
    alert("please select a title first building an army!")
  }
  else {
    this.setState({ movingArmy: true, buttonSelected: null });
  }
}

selectedDeposit = () => {   
    this.setState({ buttonSelected: "depositERC20" });
  
}

selectedWall = () => {   // if user selects the create Wall button, initialize the state
  const posX = this.state.info.x
  const posY = this.state.info.y
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
  if (posX == null || posY == null) {
    alert("please select a title first before building an army!")
  }
  else {
    this.setState({ buttonSelected: "createArmy" });
  }
}

setUserStakeAmount = (e) => {
  this.setState({ userInputedStakeAmount: e.target.value == "" ? 0 : parseFloat(e.target.value) });
}

movableNeighbor = () => {
  for (var i = 0; i < 4; i++) {
    if (this.canMove(i)) {
      return true
    }
  }
  return false
}

attackableNeighbor = () => {
  for (var i = 0; i < 4; i++) {
    if (this.canAttack(i)) {
      return true
    }
  }
  return false
}

destroyableNeighbor = () => {
  for (var i = 0; i < 4; i++) {
    if (this.canDestroy(i)) {
      return true
    }
  }
  return false
}

attack = () => {
  console.log("Attack!")
  this.setState({ isAttacking: true });
}

destroy = () => {
  console.log("Destroy Wall")
  this.setState({ isDestroying: true });
}

canMove = (dir) => {
  var neighbor
  if (dir == direction.NORTH) {
    neighbor = this.state.neighbors.NORTH
  } if (dir == direction.SOUTH) {
    neighbor = this.state.neighbors.SOUTH
  } if (dir == direction.EAST) {
    neighbor = this.state.neighbors.EAST
  } if (dir == direction.WEST) {
    neighbor = this.state.neighbors.WEST
  }
  return neighbor != null && (neighbor.isEmpty || neighbor.isFarm) && !neighbor.containsArmy
}

canAttack = (dir) => {
  var neighbor
  if (dir == direction.NORTH) {
    neighbor = this.state.neighbors.NORTH
  } if (dir == direction.SOUTH) {
    neighbor = this.state.neighbors.SOUTH
  } if (dir == direction.EAST) {
    neighbor = this.state.neighbors.EAST
  } if (dir == direction.WEST) {
    neighbor = this.state.neighbors.WEST
  }
  return neighbor != null && neighbor.containsArmy
}

canDestroy = (dir) => {
  var neighbor
  if (dir == direction.NORTH) {
    neighbor = this.state.neighbors.NORTH
  } if (dir == direction.SOUTH) {
    neighbor = this.state.neighbors.SOUTH
  } if (dir == direction.EAST) {
    neighbor = this.state.neighbors.EAST
  } if (dir == direction.WEST) {
    neighbor = this.state.neighbors.WEST
  }
  return neighbor != null && neighbor.isWall
}



confirmStake = async () => {
  console.log(this.state.userInputedStakeAmount);
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
  } else if (this.state.buttonSelected === "depositERC20") {
    await this.depositeERC20();
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
      <Button variant="contained" onClick={this.selectedDeposit}>
        Deposit Tokens ({this.ERC20balance} EMP)
        </Button>
      <Button variant="contained" disabled={!this.state.info.isEmpty || !this.state.info.isTile} onClick={this.selectedWall}>
        Create Wall
        </Button>
      <Button variant="contained" disabled={!this.state.info.isEmpty || !this.state.info.isTile} onClick={this.selectedFarm}>
        Create Farm
        </Button>
      <Button variant="contained" disabled={!this.state.info.isFarm || !this.state.info.isTile} onClick={this.selectedArmy}>
        Create Army
        </Button>
      <Button variant="contained"
        disabled={!this.state.info.isFarm}
        onClick={this.divestFarm}>
        Divest Farm
        </Button>
      <Button variant="contained"
        disabled={!this.state.info.containsArmy || !this.movableNeighbor()}
        onClick={this.selectedMoveArmy}>
        Move Army
        </Button>
      <Button variant="contained"
        disabled={!this.state.info.containsArmy || !this.state.info.isFarm}
        onClick={this.pillageFarm}>
        Pillage Farm
        </Button>
      <Button variant="contained"
        disabled={!this.state.info.containsArmy || !this.attackableNeighbor()}
        onClick={this.attack}>
        Attack!
        </Button>

      <Button variant="contained"
        disabled={!this.state.info.containsArmy || !this.destroyableNeighbor()}
        onClick={this.destroy}>
        Destroy Wall
        </Button>

      { this.state.movingArmy ?
        <div className="rowC">
          <Button variant="contained"
            disabled={!this.state.movingArmy || !this.canMove(direction.NORTH)}
            onClick={() => { this.moveArmy(direction.NORTH) }}>
            North
        </Button>
          <Button variant="contained"
            disabled={!this.state.movingArmy || !this.canMove(direction.SOUTH)}
            onClick={() => { this.moveArmy(direction.SOUTH) }}>
            South
        </Button>
          <Button variant="contained"
            disabled={!this.state.movingArmy || !this.canMove(direction.EAST)}
            onClick={() => { this.moveArmy(direction.EAST) }}>
            East
        </Button>
          <Button variant="contained"
            disabled={!this.state.movingArmy || !this.canMove(direction.WEST)}
            onClick={() => { this.moveArmy(direction.WEST) }}>
            West
        </Button>
        </div>
        : <div></div>}

      { this.state.isAttacking ?
        <div className="rowC">
          <Button variant="contained"
            disabled={!this.state.isAttacking || !this.canAttack(direction.NORTH)}
            onClick={() => { this.attackDirection(direction.NORTH) }}>
            North
        </Button>
          <Button variant="contained"
            disabled={!this.state.isAttacking || !this.canAttack(direction.SOUTH)}
            onClick={() => { this.attackDirection(direction.SOUTH) }}>
            South
        </Button>
          <Button variant="contained"
            disabled={!this.state.isAttacking || !this.canAttack(direction.EAST)}
            onClick={() => { this.attackDirection(direction.EAST) }}>
            East
        </Button>
          <Button variant="contained"
            disabled={!this.state.isAttacking || !this.canAttack(direction.WEST)}
            onClick={() => { this.attackDirection(direction.WEST) }}>
            West
        </Button>
        </div>
        : <div></div>}

      { this.state.isDestroying ?
        <div className="rowC">
          <Button variant="contained"
            disabled={!this.state.isDestroying || !this.canDestroy(direction.NORTH)}
            onClick={() => { this.destroyDirection(direction.NORTH) }}>
            North
        </Button>
          <Button variant="contained"
            disabled={!this.state.isDestroying || !this.canDestroy(direction.SOUTH)}
            onClick={() => { this.destroyDirection(direction.SOUTH) }}>
            South
        </Button>
          <Button variant="contained"
            disabled={!this.state.isDestroying || !this.canDestroy(direction.EAST)}
            onClick={() => { this.destroyDirection(direction.EAST) }}>
            East
        </Button>
          <Button variant="contained"
            disabled={!this.state.isDestroying || !this.canDestroy(direction.WEST)}
            onClick={() => { this.destroyDirection(direction.WEST) }}>
            West
        </Button>
        </div>
        : <div></div>}



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
        <h1>{this.state.info.isTile ? "Tile " + this.state.info.x + "," + this.state.info.y : "Select a Tile"}</h1>
        <p> {this.state.info.isTile ? "Yeild Modifier: x" + this.state.info.modifier : ""} </p>

        {!this.state.info.isEmpty ? <div>
          <h2> {this.state.info.tileType()}</h2>

          {this.state.info.isFarm ?
            <ul><li>Value: {this.state.info.value}</li>
              <li>Owner: {this.state.info.owner}</li></ul>
            :
            <ul><li>Value: {this.state.info.value}</li></ul>}
        </div> : <div />
        }

        {
          this.state.info.containsArmy ?
            <div><h2>Army</h2>
              <ul><li>Value: {this.state.info.armyValue}</li>
                <li>Owner: {this.state.info.armyOwner}</li></ul></div>
            : <div />
        }

        <p align="left">{this.state.info.owner ? "Tile Owner: " + this.state.info.owner : null}</p>

      </div>
    </div>
  )
  }
}



export default Editor;