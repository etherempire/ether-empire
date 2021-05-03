// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.3;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./libraries/FixedPoint.sol"; 
import "./EtherEmpireTypes.sol"; 
import "./EtherEmpireStorage.sol"; 
import "./EtherEmpireDiplomacy.sol"; 
import "./EtherEmpireCombat.sol"; 

// Handles entity creation and core features
contract EtherEmpireWorld is Ownable, EtherEmpireStorage {

    event FarmBuilt(address _owner, uint32 _id, uint16 _locx, uint16 _locy);
    event WallBuilt(address _owner, uint32 _id, uint16 _locx, uint16 _locy);
    event ArmyRecruited(address _owner, uint32 _id, uint16 _locx, uint16 _locy);
    event ArmyMoved(address _owner, uint32 _id, uint16 _locx, uint16 _locy);

    constructor(uint64 _yieldMin_32x32, uint64 _yieldRange_32x32, uint64 _armyToTokenRatio_32x32) {
        yieldMin_32x32 = _yieldMin_32x32;
        yieldRange_32x32 = _yieldRange_32x32; 
        armyToTokenRatio_32x32 = _armyToTokenRatio_32x32;
        globalLandValue_32x32 = 0;
        spawnedEntitiesCount = 0;
    }

    modifier onlyOwnerOf(uint32 _id, address owner) {
        require(entityToOwner[_id] == owner);
        _;
    }

    modifier isEmpty(uint16 _locx, uint16 _locy, uint8 layer) {
        require(allEntities[_locx  + _locy * map_width + layer * map_width * map_height].entityType == EtherEmpireTypes.EntityType.EMPTY);
        _; 
    }

    function _randMod(uint _seed, uint _nonce, uint _mod) internal pure returns(uint) {
        return uint(keccak256(abi.encodePacked(_seed, _nonce))) % _mod; 
    }

    // This function can only be called by whoever deployed the contract 
    function populateLand(uint16 _width, uint16 _height, uint _seed) onlyOwner public {
        require(allEntities[0].entityType == EtherEmpireTypes.EntityType.EMPTY, "Non-empty world");

        map_width = _width;
        map_height = _height; 

        // Declare a local nonce so that the same seed will generate the same map 
        uint nonce = 0;

        for (uint16 y = 0; y < _width; y++) {
            for (uint16 x = 0; x < _height; x++) {
                uint32 index = x + y * map_width;
                // Currently only generates arable lands 
                EtherEmpireTypes.Entity memory newLand = EtherEmpireTypes.Entity(uint32(index), EtherEmpireTypes.EntityType.TILE, 0, uint64(FixedPoint.add(yieldMin_32x32, _randMod(_seed, nonce++, yieldRange_32x32), 32, 32, 32)), x, y);
                allEntities[index] = newLand; 
                entityToOwner[index] = address(0); // wilderness

            }
        }
    }

    // Returns total farm yield at current block number, in the UQ144x112 format. Assumes supply of tokens do not exceed 2**144 - 1 
    function yieldValue(uint16 _locx, uint16 _locy) view public returns(uint) {
        uint32 index = _locx + _locy * map_width + map_height * map_width; 
        EtherEmpireTypes.Entity storage thisFarm = allEntities[index];
        require(thisFarm.entityType == EtherEmpireTypes.EntityType.FARM, "No farm built here");        
        uint64 landValueAtBlock_32x32 = globalLandValue_32x32; 
        uint32 blockNumber = uint32(block.number);
        uint64 cumulativeYield_32x32 = 0; 
        for (uint32 i = blockNumber; i > allEntities[index].qualifier1_32x32; i--) {
            cumulativeYield_32x32 += uint64(FixedPoint.multiply((FixedPoint.divide(thisFarm.qualifier2_32x32, landValueAtBlock_32x32, 32, 32, 32, 32)),
                                                         tokensBurntAtBlock[i],
                                                         32, 0, 32, 32));
            landValueAtBlock_32x32 -= landValueAddedAtBlock_32x32[i]; 
        }
        return cumulativeYield_32x32;
    }

    // Requires implementation of ERC20 
    function buildFarm(uint16 _locx, uint16 _locy, uint32 tokenStaked) public isEmpty(_locx, _locy, 1) returns(uint32) {
        uint32 index = _locx + _locy * map_width + map_height * map_width;
        uint32 blockNumber = uint32(block.number);
        // Check if message sender approved for token to be staked in the smart contract  
        uint64 landValue_32x32 = uint64(FixedPoint.sqrt(uint64(tokenStaked) << 32, 32, 32)); // Added precision
        allEntities[index] = EtherEmpireTypes.Entity(index, EtherEmpireTypes.EntityType.FARM, blockNumber, landValue_32x32, _locx, _locy);
        landValueAddedAtBlock_32x32[blockNumber] = uint64(FixedPoint.add(landValueAddedAtBlock_32x32[blockNumber], landValue_32x32, 32, 32, 32));
        globalLandValue_32x32 = uint64(FixedPoint.add(globalLandValue_32x32, landValue_32x32, 32, 32, 32)); 
        entityToOwner[index] = msg.sender;
        emit FarmBuilt(msg.sender, index, _locx, _locy);
        return index;
    }

    // Requires implementation of ERC20 
    function buildWall(uint16 _locx, uint16 _locy, uint32 tokenSpent) public isEmpty(_locx, _locy, 1) returns(uint32) {
        uint32 index = _locx + _locy * map_width + map_height * map_width;
        uint32 blockNumber = uint32(block.number);
        // Check if message sender approved for token to be staked in the smart contract  
        uint64 wallFortification_32x32 = uint64(tokenSpent) << 32;
        allEntities[index] = EtherEmpireTypes.Entity(index, EtherEmpireTypes.EntityType.WALL, blockNumber, wallFortification_32x32, _locx, _locy);
        tokensBurntAtBlock[blockNumber] = tokensBurntAtBlock[blockNumber] + tokenSpent;
        emit WallBuilt(msg.sender, index, _locx, _locy);
        return index;
    }

    // Requires implementation of ERC20 
    function buildArmy(uint16 _locx, uint16 _locy, uint32 tokenSpent) public returns(uint32) {
        EtherEmpireTypes.Entity memory l2 = allEntities[_locx  + _locy * map_width + 1 * map_width * map_height];
        require(l2.entityType == EtherEmpireTypes.EntityType.FARM, "Must be built on farm!");
        require(entityToOwner[l2.id] == msg.sender, "Must be built on your farm!"); 
        uint32 index = spawnedEntitiesCount + 2 * map_width * map_height;
        uint32 blockNumber = uint32(block.number);
        // Check if message sender approved for token to be staked in the smart contract  
        uint64 armySize_32x32 = uint64(FixedPoint.divide(uint64(tokenSpent) << 32, armyToTokenRatio_32x32, 32, 32, 32, 32)); 
        allEntities[index] = EtherEmpireTypes.Entity(index, EtherEmpireTypes.EntityType.ARMY, blockNumber, armySize_32x32, _locx, _locy);
        tokensBurntAtBlock[blockNumber] = tokensBurntAtBlock[blockNumber] + tokenSpent;
        entityToOwner[index] = msg.sender;
        spawnedEntitiesCount += 1; 
        emit ArmyRecruited(msg.sender, index, _locx, _locy);
        return index;
    }

    // Relay external calls to specific libraries 

    function armyAttack(uint32 _self, uint32 _other) external onlyOwnerOf(_self, msg.sender) returns(bool) {
        return EtherEmpireCombat.armyAttack(_self, _other, allEntities, entityToOwner, nonAggression);
    }

    function armyMove(uint32 _id, uint16 _locx, uint16 _locy) external onlyOwnerOf(_id, msg.sender) returns(bool) {
        bool successfulMovement = EtherEmpireCombat.armyMove(_id, _locx, _locy, allEntities, entityToOwner, access);
        if (successfulMovement) emit ArmyMoved(msg.sender, _id, _locx, _locy);
        return successfulMovement;
    }
}
