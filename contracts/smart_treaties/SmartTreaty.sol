// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.3;
import "./../EtherEmpireToken.sol"; 
import "./../EtherEmpireWorld.sol"; 

abstract contract SmartTreaty {

    address[] public signed;
    uint public signed_count; 
    bool public isActive;
    EtherEmpireToken tokenContract; 
    EtherEmpireWorld embeddedWorld; 

    bool self_invoked; 

    constructor(bool _self_invoked, address _tokenAddress, address _worldAddress) {
        self_invoked = _self_invoked;
        tokenContract = EtherEmpireToken(_tokenAddress);
        embeddedWorld = EtherEmpireWorld(_worldAddress);
        isActive = true; 
    }

    function sign() external {
        _sign(msg.sender);
    }

    function _sign(address signatory) internal {

        bool already_signed = false; 

        for (uint i = 0; i < signed_count; i++)
        {
            if (signed[i] == signatory) 
            {
                already_signed = true;
                break; 
            }
        }

        if (!already_signed)
        {
            signed.push(signatory); 
            signed_count++; 
            if (self_invoked) invoke();
        }
        
    } 

    function invoke() virtual public; 

}