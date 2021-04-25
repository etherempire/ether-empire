

// call to backend returns Json list of TileData for immovable data
export type TileData = {
    x: number // x coordinate of tile
    y: number // y coordinate of tile
    yield: number // yield of this land - could be derrived from elevation etc.
    owner: number // address of tile owner
    value: number // coin invested in this tile
    type: number // empty, farm, wall
}

export type EntityData = {
    id: number // 
    x: number // x coordinate of entity
    y: number // y coordinate of entity
    type: number // army, ..
    owner: number // address of entity owner
    value: number // coin value of this entity
    armyAttrition: number // army loss next turn
    armyStrength: number // army strength
}

// front-end breaks this into layers
export type MapDataTileLayer = {
    x: number // x coordinate of tile
    y: number // y coordinate of tile
    yield: number // yield of this land - could be derrived from elevation etc.
}

export type TilePropertiesLayer = {
    x: number // x coordinate of tile
    y: number // y coordinate of tile
    owner: number // address of tile owner
    value: number // coin invested in this tile
    type: number // empty, farm, wall
}

export type DerrivedArmyDataLayer = {
    x: number // x coordinate of army
    y: number // y coordinate of army
}

export type DerrivedTileDataLayer = {
    x: number // x coordinate of tile
    y: number // y coordinate of tile
    yieldPerTurn: number // coin per turn added to owner's bank
    // all stats can be added here like apy, etc
}
