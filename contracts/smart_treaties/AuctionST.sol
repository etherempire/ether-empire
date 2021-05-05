pragma solidity ^0.8.3;
import "./SmartTreaty.sol"; 
import "@openzeppelin/contracts/access/Ownable.sol";

contract AuctionST is SmartTreaty, Ownable {

    address buyer;
    
    event AuctionCompleted(address _owner, address _buyer, uint32 _id, uint32 _tokenTransferred); 

    constructor(address _tokenAddress, address _worldAddress) SmartTreaty(false, _tokenAddress, _worldAddress) {
    }

    function invoke() override public onlyOwner {

        require(buyer != address(0));
        uint paymentAmount = tokenContract.allowance(buyer, address(this));

        // Facilitate transaction
        tokenContract.transferFrom(buyer, address(this), paymentAmount);
        tokenContract.transfer(buyer, paymentAmount); 

        // Facilitate change of ownership 
        // embeddedWorld.entityToOwner

    }

    function setBuyer(address _buyer) external onlyOwner returns(bool) { 

        for (uint i = 0; i < signed_count; i++)
        {
            if (signed[i] == _buyer) 
            {
                buyer = _buyer; 
                return true; 
            }
        }

        return false;
        
    }

    
}