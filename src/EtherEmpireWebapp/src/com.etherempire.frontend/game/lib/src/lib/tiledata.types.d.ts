export declare type TileData = {
    x: number;
    y: number;
    yield: number;
    owner: number;
    value: number;
    type: number;
};
export declare type EntityData = {
    id: number;
    x: number;
    y: number;
    type: number;
    owner: number;
    value: number;
    armyAttrition: number;
    armyStrength: number;
};
export declare type MapDataTileLayer = {
    x: number;
    y: number;
    yield: number;
};
export declare type TilePropertiesLayer = {
    x: number;
    y: number;
    owner: number;
    value: number;
    type: number;
};
export declare type DerrivedArmyDataLayer = {
    x: number;
    y: number;
};
export declare type DerrivedTileDataLayer = {
    x: number;
    y: number;
    yieldPerTurn: number;
};
