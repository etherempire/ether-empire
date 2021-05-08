pragma solidity ^0.8.3;
import "../EtherEmpireWorld.sol"; 

contract EntityTransferST is SmartTreaty {

    constructor(EtherEmpireToken _tokenAddress, EtherEmpireWorld _worldAddress) SmartTreaty(_tokenAddress, _worldAddress) {
    }

    // To be implemented
    function duplicate() public override returns(address) {
        // EntityTransferST newTreaty = new EntityTransferST(tokenContract, embeddedWorld);
        // return address(newTreaty);
    } 

    function invoke(uint32 _id, address _newOwner) public {
        embeddedWorld.changeEntityOwner(_id, _newOwner);
    }
}