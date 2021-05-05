export type Coord = {
    x: number
    y: number
  }
  
  export type Layer = (x: number, y: number) => Tile | null
  
  export type Tile = {
    color: string
    top?: boolean
    left?: boolean
    topLeft?: boolean
    scale?: number
    
    outlineLeft?: boolean
    outlineTop?: boolean
    outlineRight?: boolean
    outlineBottom?: boolean
    outlineTopLeft?: boolean
    outlineTopRight?: boolean
    outlineBottomLeft?: boolean
    outlineBottomRight?: boolean
    outlineColor?: string
    outlineWidth?: number
  }