// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.3;

contract EtherEmpireTypes {
    
    enum EntityType { 
        EMPTY,
        TILE,       // q1: TileType     q2: Modifier
        WALL, 
        ARMY, 
        FARM        // q1: BlockNumber  q2: FarmValue
        }

    struct Entity {
        uint32 id;
        EntityType entityType;
        uint64 qualifier1_32x32; // overloaded, different use cases for different entity types 
        uint64 qualifier2_32x32; 
        uint16 locx;
        uint16 locy;
    }
}