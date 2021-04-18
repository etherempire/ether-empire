// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.3;
import "@openzeppelin/contracts/access/Ownable.sol";

contract GameWorld is Ownable {

    enum EntityType { LAND, WALL, ARMY }
    struct Entity {
        uint id;
        EntityType entityType;
        uint qualifier1;
        uint qualifier2;
        uint16 locx;
        uint16 locy;
    }

    Entity[] allEntities;

    mapping (uint => address) entityToOwner; 
    // Qualifier2 of land entites can be converted into a float in [yieldMin, yieldMax]
    uint public yieldMin;
    uint public yieldMax; 

    constructor(uint _yieldMin, uint _yieldMax) {
        yieldMin = _yieldMin;
        yieldMax = _yieldMax; 
    }

    modifier onlyOwnerOf(uint _entityId, address owner) {
        require(entityToOwner[_entityId] == owner);
        _;
    }

    function _randMod(uint _seed, uint _nonce, uint _mod) internal pure returns(uint) {
        return uint(keccak256(abi.encodePacked(_seed, _nonce))) % _mod; 
    }

    // This function can only be called by whoever deployed the contract 
    function populateLand(uint _width, uint _height, uint _seed) onlyOwner public {

        // Declare a local nonce so that the same seed will generate the same map 
        uint nonce = 0;

        for (uint16 x = 0; x < _width; x++) {
            for (uint16 y = 0; y < _height; y++) {

                // Currently only generates arable lands 
                Entity memory newLand = Entity(allEntities.length, EntityType.LAND, 0, _randMod(_seed, nonce++, 2 ** 256 - 1), x, y);
                allEntities.push(newLand); 
                entityToOwner[newLand.id] = address(0); //wilderness

            }
        }
    }


}