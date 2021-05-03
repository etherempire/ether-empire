// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.3;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./libraries/FixedPoint.sol";
import "./EtherEmpireDiplomacy.sol";
import "./EtherEmpireTypes.sol";

library EtherEmpireCombat {

    event EntityDestroyed(uint32 _id, address _owner, address _destroyer);

    function destroy(uint32 _id, 
                     address _destroyer,
                     mapping (uint32 => EtherEmpireTypes.Entity) storage allEntities, 
                     mapping (uint32 => address) storage entityToOwner) internal {
        allEntities[_id].id = 0;
        allEntities[_id].entityType = EtherEmpireTypes.EntityType.EMPTY;
        allEntities[_id].qualifier1_32x32 = 0;
        allEntities[_id].qualifier2_32x32 = 0;
        allEntities[_id].locx = 0;
        allEntities[_id].locy = 0;
        emit EntityDestroyed(_id, entityToOwner[_id], _destroyer);
        entityToOwner[_id] = address(0);
    }

    function armyAttack(uint32 _self, 
                        uint32 _other,
                        mapping (uint32 => EtherEmpireTypes.Entity) storage allEntities, 
                        mapping (uint32 => address) storage entityToOwner, 
                        mapping (address => mapping(address => bool)) storage nonAggression) public returns(bool) {

        address aggressor = entityToOwner[_self]; 
        address defender = entityToOwner[_other]; 
        EtherEmpireTypes.Entity storage aggressor_entity = allEntities[_self];
        EtherEmpireTypes.Entity storage defender_entity = allEntities[_other];

        // Abort if peace exists between parties, or attacking unit is dead 
        if (aggressor_entity.qualifier2_32x32 == 0
            || aggressor_entity.entityType != EtherEmpireTypes.EntityType.ARMY) // || EtherEmpireDiplomacy.nonAggressionActive(aggressor, defender, nonAggression)
        {
            return false;
        }

        // Check if within range 
        uint diff_x = aggressor_entity.locx >= defender_entity.locx ? aggressor_entity.locx - defender_entity.locx : defender_entity.locx - aggressor_entity.locx;
        uint diff_y = aggressor_entity.locy >= defender_entity.locy ? aggressor_entity.locy - defender_entity.locy : defender_entity.locy - aggressor_entity.locy;

        if (diff_x + diff_y > 1) return false;

        // Simple combat mechanic, only for testing 
        if (defender_entity.entityType == EtherEmpireTypes.EntityType.WALL) 
        {
            if (aggressor_entity.qualifier2_32x32 > defender_entity.qualifier2_32x32) {
                destroy(_other, aggressor, allEntities, entityToOwner);
            } else 
            {
                destroy(_self, defender, allEntities, entityToOwner);
            }
        } else if (defender_entity.entityType == EtherEmpireTypes.EntityType.ARMY) 
        {
            if (aggressor_entity.qualifier2_32x32 > defender_entity.qualifier2_32x32) {
                destroy(_other, aggressor, allEntities, entityToOwner);
            } else 
            {
                destroy(_self, defender, allEntities, entityToOwner);
            }
        }

        return true; 
    }

    function armyMove(uint32 _self, 
                      uint16 _locx,
                      uint16 _locy,
                      mapping (uint32 => EtherEmpireTypes.Entity) storage allEntities, 
                      mapping (uint32 => address) storage entityToOwner, 
                      mapping (address => mapping(address => bool)) storage access) public returns(bool) {

        address sender = entityToOwner[_self]; 
        EtherEmpireTypes.Entity storage entity = allEntities[_self];

        // Only army can move 
        if (entity.entityType != EtherEmpireTypes.EntityType.ARMY) 
        {
            return false;
        }

        // Check if within range 
        uint diff_x = entity.locx >= _locx ? entity.locx - _locx : _locx - entity.locx;
        uint diff_y = entity.locy >= _locy ? entity.locy - _locy : _locy - entity.locy;

        if (diff_x + diff_y > 1) return false;

        entity.locx = _locx;
        entity.locy = _locy;

        // Access-enabled movement to be implemented

        return true;
    }


}