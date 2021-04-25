// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./libraries/FixedPoint.sol"; 

contract GameWorld is Ownable {

    enum EntityType { 
        TILE,       // q1: TileType     q2: Modifier
        WALL, 
        ARMY, 
        FARM        // q1: BlockNumber  q2: FarmValue
        }

    struct Entity {
        uint id;
        EntityType entityType;
        uint qualifier1;
        FixedPoint.uq112x112 qualifier2; // For handling fixed-point decimals
        uint16 locx;
        uint16 locy;
    }

    mapping (uint => Entity) public allEntities;
    uint public map_width;
    uint public map_height;

    mapping (uint => address) entityToOwner; 
    mapping (uint => uint) tokensBurntAtBlock;
    mapping (uint => FixedPoint.uq112x112) landValueAddedAtBlock;

    // Fixed point float numbers , with range [0, 2*112-1] and resolution of 1/2*112
    FixedPoint.uq112x112 public yieldMin;
    FixedPoint.uq112x112 public yieldRange; 
    FixedPoint.uq112x112 public globalLandValue;

    constructor(uint224 _yieldMin, uint224 _yieldRange) {
        yieldMin = FixedPoint.uq112x112(_yieldMin);
        yieldRange = FixedPoint.uq112x112(_yieldRange); 
        globalLandValue = FixedPoint.uq112x112(0);
    }

    modifier onlyOwnerOf(uint _entityId, address owner) {
        require(entityToOwner[_entityId] == owner);
        _;
    }

    modifier isEmpty(uint _locx, uint _locy, uint layer) {
        require(entityToOwner[_locx  + _locy * map_width + layer * map_width * map_height] == address(0));
        _; 
    }

    function _randMod(uint _seed, uint _nonce, uint _mod) internal pure returns(uint) {
        return uint(keccak256(abi.encodePacked(_seed, _nonce))) % _mod; 
    }

    // This function can only be called by whoever deployed the contract 
    function populateLand(uint _width, uint _height, uint _seed) onlyOwner public {

        map_width = _width;
        map_height = _height; 

        // Declare a local nonce so that the same seed will generate the same map 
        uint nonce = 0;

        for (uint16 y = 0; y < _width; y++) {
            for (uint16 x = 0; x < _height; x++) {
                uint index = x + y * map_width;
                // Currently only generates arable lands 
                Entity memory newLand = Entity(index, EntityType.TILE, 0, 
                FixedPoint.add(FixedPoint.muluq(yieldRange,FixedPoint.fraction(_randMod(_seed, nonce++, 100), 100)), yieldMin)  // Highly unoptimized
                , x, y);
                allEntities[index] = newLand; 
                entityToOwner[index] = address(0); // wilderness

            }
        }
    }

    // Returns total farm yield at current block number, in the UQ144x112 format. Assumes supply of tokens do not exceed 2**144 - 1 
    function yieldValue(uint16 _locx, uint16 _locy) view public returns(uint) {
        uint index = _locx + _locy * map_width + map_height * map_width; 
        Entity storage thisFarm = allEntities[index];
        require(thisFarm.entityType == EntityType.FARM);
        FixedPoint.uq112x112 memory landValueAtBlock = globalLandValue;
        FixedPoint.uq144x112 memory cumulativeYield = FixedPoint.uq144x112(0); 
        for (uint i = block.number; i > allEntities[index].qualifier1; i--) {
            cumulativeYield = FixedPoint.add144(cumulativeYield, FixedPoint.mul(FixedPoint.muluq(thisFarm.qualifier2, FixedPoint.reciprocal(landValueAtBlock)), tokensBurntAtBlock[i])); 
            landValueAtBlock = FixedPoint.sub(landValueAtBlock,landValueAddedAtBlock[i]); 
            // Shouldn't be necessary, but added as a safe check 
            if (landValueAtBlock._x == 0) break; 
        }
        return cumulativeYield._x;
    }

    // Requires implementation of ERC20 
    function buildFarm(uint16 _locx, uint16 _locy, uint112 tokenStaked) public isEmpty(_locx, _locy, 1) {
        uint index = _locx + _locy * map_width + map_height * map_width;
        
        // Check if message sender approved for token to be staked in the smart contract  

        FixedPoint.uq112x112 memory landValue = FixedPoint.sqrt(FixedPoint.encode(tokenStaked));
        allEntities[index] = Entity(index, EntityType.FARM, block.number, landValue, _locx, _locy);
        landValueAddedAtBlock[block.number] = FixedPoint.add(landValueAddedAtBlock[block.number], landValue);
        globalLandValue = FixedPoint.add(globalLandValue, landValue); 
    }

    // Requires implementation of ERC20 
    function buildWall(uint16 _locx, uint16 _locy, uint112 tokenStaked) public isEmpty(_locx, _locy, 1) {
        uint index = _locx + _locy * map_width + map_height * map_width;
        
        // Check if message sender approved for token to be staked in the smart contract  
        
        uint112 wallFortification = tokenStaked;
        allEntities[index] = Entity(index, EntityType.WALL, block.number, FixedPoint.encode(wallFortification), _locx, _locy);
        tokensBurntAtBlock[block.number] = tokensBurntAtBlock[block.number] + wallFortification;
    }

}
