// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.3;
import "./../EtherEmpireToken_schain.sol"; 
import "./../EtherEmpireWorld.sol"; 

abstract contract SmartTreaty {

    address[] public signed;
    uint public signed_count; 
    EtherEmpireToken tokenContract; 
    EtherEmpireWorld embeddedWorld; 

    constructor(EtherEmpireToken _tokenAddress, EtherEmpireWorld _worldAddress) {
        tokenContract = _tokenAddress;
        embeddedWorld = _worldAddress;
    }


    function sign(address signatory) public {
        require(msg.sender == address(embeddedWorld));
        
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
        }
        
    } 

    function duplicate() virtual public returns(address);

    // function invoke() virtual public; 

}