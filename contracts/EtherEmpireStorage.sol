// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.3;
import "./EtherEmpireTypes.sol"; 

contract EtherEmpireStorage {

    // World 
    mapping (uint32 => EtherEmpireTypes.Entity) public allEntities;
    uint16 public map_width;
    uint16 public map_height;
    uint32 spawnedEntitiesCount; 
    address combatContract;


    mapping (uint32 => address) entityToOwner; 
    mapping (uint32 => uint32) tokensBurntAtBlock; // In integer unit, of smallest decimal fungible
    mapping (uint32 => uint64) landValueAddedAtBlock_32x32;

    uint64 public yieldMin_32x32; 
    uint64 public yieldRange_32x32; 
    uint64 public armyToTokenRatio_32x32; 
    uint64 public globalLandValue_32x32;

    // Diplomacy 
    mapping (address => mapping(address => bool)) nonAggression;
    mapping (address => mapping(address => bool)) access;
}