import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { TileInfo } from '../TileInfo/TileInfo';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import "./Editor.css"
import { ContractCaller } from "./ContractCaller";
import { Actions } from "./Actions";

const direction = {
  NORTH: 0,
  SOUTH: 1,
  EAST: 2,
  WEST: 3
}

// frontend of editor
// wflow: Actions tells Editor available actions, Editor chooses available action, ContractCaller executes action
class Editor extends Component {
  constructor(props) {
    super(props)
    this.tileInfoElement = React.createRef();

    this.state = { info: new TileInfo(null, null), userInputedStakeAmount: "", buttonSelected: null };
    this.atlas = props.atlas

    this.updateParent = props.updateParent

    this.contractCaller = new ContractCaller(props.web3)
    this.actions = new Actions()
  }

  setGameSize = (width, height) => {
    this.setState({ gameWidth: width, gameHeight: height })
  }

  setTileInfo = (info, neighbors) => { //info is a current tile to be focused on + up to 4 neighboors
    this.setState({ info: info, neighbors: neighbors, buttonSelected: null, movingArmy: false })
  }


  selectedMoveArmy = () => { 
    this.setState({ movingArmy: true, buttonSelected: null });
  }
  selectedDeposit = () => {
    this.setState({ buttonSelected: "depositERC20" });
  }
  selectedWall = () => {
    this.setState({ buttonSelected: "createWall" });
  }
  selectedFarm = () => {
      this.setState({ buttonSelected: "createFarm" });
  }
  selectedArmy = () => {
      this.setState({ buttonSelected: "createArmy" });
  }
  setUserStakeAmount = (e) => {
    const floatRegExp = new RegExp('([0-9]+([.][0-9]*)?|[.][0-9]+)$') // allow for decimals input 
    if (floatRegExp.test(e.target.value)) this.setState({ userInputedStakeAmount: e.target.value  });
  }

  attack = () => {
    this.setState({ isAttacking: true });
  }

  destroy = () => {
    this.setState({ isDestroying: true });
  }

  confirmStake = async () => {
    if (this.state.userInputedStakeAmount == "" || this.state.userInputedStakeAmount <= 0) {  //invalid user input
      alert("invalid amount!");
    }else if (this.state.buttonSelected === "createWall") {
      await this.contractCaller.createWall(this.state.info, this.state.userInputedStakeAmount);
    }else if (this.state.buttonSelected === "createFarm") {
      await this.contractCaller.createFarm(this.state.info, this.state.userInputedStakeAmount);
    }else if (this.state.buttonSelected === "createArmy") {
      await this.contractCaller.createArmy(this.state.info, this.state.userInputedStakeAmount);
    }else if (this.state.buttonSelected === "depositERC20") {
      await this.contractCaller.depositeERC20(this.state.userInputedStakeAmount);
    }else {
      alert("error confirming stake");
    }
    
    //clear state
    this.updateParent()
    this.setState({ userInputedStakeAmount: "", buttonSelected: null })
  }

  directionalButtons(onClick, disabled, dirDisabled){
    if (!disabled)
      return (
      <div className="rowC">
              <Button variant="contained"
                disabled={dirDisabled(direction.NORTH)}
                onClick={() => onClick(direction.NORTH)}>
                North
          </Button>
              <Button variant="contained"
                disabled={dirDisabled(direction.SOUTH)}
                onClick={() => onClick(direction.SOUTH)}>
                South
          </Button>
              <Button variant="contained"
                disabled={dirDisabled(direction.EAST)}
                onClick={() => onClick(direction.EAST)}>
                East
          </Button>
              <Button variant="contained"
                disabled={dirDisabled(direction.WEST)}
                onClick={() => onClick(direction.WEST)}>
                West
          </Button>
      </div>
      )
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
          disabled={!this.state.info.containsArmy || !this.actions.movableNeighbor(this.state.neighbors)}
          onClick={this.selectedMoveArmy}>
          Move Army
        </Button>

        <Button variant="contained"
          disabled={!this.state.info.containsArmy || !this.state.info.isFarm}
          onClick={() => {this.contractCaller.pillageFarm(this.state.info); this.updateParent();}}>
          Pillage Farm
        </Button>

        <Button variant="contained"
          disabled={!this.state.info.containsArmy || !this.actions.attackableNeighbor(this.state.neighbors)}
          onClick={this.attack}>
          Attack!
        </Button>

        <Button variant="contained"
          disabled={!this.state.info.containsArmy || !this.actions.destroyableNeighbor(this.state.neighbors)}
          onClick={this.destroy}>
          Destroy Wall
        </Button>

        { //move army directions
          this.directionalButtons(
            (dir) => {
              this.contractCaller.moveArmy(this.state.info, this.actions.getNeighbor(dir, this.state.neighbors));
              this.setState({movingArmy: false})
              this.updateParent();
            },
            !this.state.movingArmy,
            (dir) => !this.actions.canMove(dir,this.state.neighbors)
          )
        }

        { //attack directions
          this.directionalButtons(
            (dir) => {
              this.contractCaller.attackDirection(this.state.info, this.actions.getNeighbor(dir, this.state.neighbors));
              this.setState({isAttacking: false})
              this.updateParent();
            },
            !this.state.isAttacking,
            (dir) => !this.actions.canAttack(dir,this.state.neighbors)
          )
        }

        { //destroy directions
          this.directionalButtons(
            (dir) => {
              this.contractCaller.destroyDirection(this.state.info, this.actions.getNeighbor(dir, this.state.neighbors));
              this.setState({isDestroying: false})
              this.updateParent();
            },
            !this.state.isDestroying,
            (dir) => !this.actions.canDestroy(dir,this.state.neighbors)
          )
        }

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
          <p> {this.state.info.isTile ? "Yield Modifier: x" + this.state.info.modifier : ""} </p>

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
