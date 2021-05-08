// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


// THIS IS NOT INTENDED FOR PRODUCTION USE, ONLY FOR TESTING
contract TokenAirDrop {
    address payable owner;
    ERC20 token;
    uint fixedRate;

    constructor(ERC20 _token, uint _fixedRate) {
        owner = payable(msg.sender);
        fixedRate = _fixedRate;
        token = _token; 
    }

    function buy() external payable {
        owner.transfer(msg.value);
        token.transferFrom(owner, msg.sender, msg.value / fixedRate);
    }

    function remainingTokens() external view returns(uint) {
        return token.allowance(owner, address(this));
    }
}