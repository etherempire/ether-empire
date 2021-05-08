// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


// THIS IS NOT INTENDED FOR PRODUCTION USE, ONLY FOR TESTING
contract TokenAirDrop is Ownable {
    string[] claimed; 
    uint claimedCount;
    ERC20 token;
    uint airdropAmount;
    string secret; 

    constructor(ERC20 _token, uint _airdropAmount) {
        airdropAmount = _airdropAmount;
        token = _token; 
        claimedCount = 0;
    }

    function setSecret(string calldata _secret) external onlyOwner {
        secret = _secret;
    }

    function _compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    function claim(uint256 _key, string calldata _identifier) external {  
        require(uint256(keccak256(abi.encodePacked(secret, _identifier))) == _key, "Key does not match ID!");
        
        bool hasClaimed = false;
        for (uint i = 0; i < claimedCount; i++) 
        {
            if (_compareStrings(claimed[i], _identifier)) hasClaimed = true;
        }
        require(!hasClaimed, "You already claimed the tokens once!");
        
        token.transferFrom(owner(), msg.sender, airdropAmount);
    }

    function remainingTokens() external view returns(uint) {
        return token.allowance(owner(), address(this));
    }
}