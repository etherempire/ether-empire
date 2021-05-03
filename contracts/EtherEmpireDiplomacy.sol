// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.3;

library EtherEmpireDiplomacy {

    // Policy legos are operational - all relations are defined but what each party can or cannot do. Hence, abstract ideas such as 'alliance' are not enforced/defined in this context. 
    function sendNonAggression(address self, 
                               address other, 
                               mapping (address => mapping(address => bool)) storage nonAggression) external {
        nonAggression[self][other] = true;
    }

    function breakNonAggression(address self, 
                                address other, 
                                mapping (address => mapping(address => bool)) storage nonAggression) external {
        nonAggression[self][other] = false;
    }

    function giveAccess(address self, 
                        address other, 
                        mapping (address => mapping(address => bool)) storage access) external {
        access[other][self] = true;
    }

    function revokeAccess(address self, 
                          address other, 
                          mapping (address => mapping(address => bool)) storage access) external {
        access[other][self] = false;
    }

    function nonAggressionActive(address self, 
                                 address other, 
                                 mapping (address => mapping(address => bool)) storage nonAggression) external view returns(bool) {
        if (self == other) return true;
        // Enforce mutuality of non-aggression pact
        return nonAggression[self][other] && nonAggression[other][self];
    }

    function hasAccess(address self, 
                       address other, 
                       mapping (address => mapping(address => bool)) storage access) external view returns(bool) {
        if (self == other) return true;
        // Access can be one-way
        return access[self][other];
    }

}