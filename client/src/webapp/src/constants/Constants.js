export const gameSize = 10

export const color = {
    EMPTY: "#d3d3d3", //light grey
    FARM: "#228B22", //green
    WALL: "#282828", //grey
    ENEMY_ARMY: "#8b0000", //red
    FRIENDLY_ARMY: "#000080", //blue
    OUT_OF_BOUNDS: "#000000", //black
    UNLOADED: "#FF00FF", //magneta
    SELECTED: "#FFFFFF80" //white highlight
}
  
export const typeIntToTypeColor = {
    0: color.EMPTY,
    1: color.FARM,
    2: color.WALL,
    3: color.ENEMY_ARMY,
    4: color.FRIENDLY_ARMY,
    5: color.OUT_OF_BOUNDS,
    6: color.UNLOADED,
    7: color.SELECTED
}

export const typeIntToTypeString = {
    0: "Empty",
    1: "Farm",
    2: "Wall",
    3: "Enemy Army",
    4: "Friendly Army",
    5: "",
    6: "Loading",
}

export const typeToInt = {
    EMPTY: 0,
    FARM: 1,
    WALL:2,
    ENEMY_ARMY: 3,
    FRIENDLY_ARMY: 4,
    OUT_OF_BOUNDS: 5,
    UNLOADED: 6,
    SELECTED: 7
}

export const infoTypeToIndex = {
    TILE_TYPE: 0,
    OWNER: 1,
    CREATED_BY: 2,
    VALUE: 3
}