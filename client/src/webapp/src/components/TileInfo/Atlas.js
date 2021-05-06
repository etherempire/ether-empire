import { TileInfo } from "./TileInfo";


export class Atlas {

    emptyTileGrid(r,c) {
        var i
        var j
        const grid = []
        for(i=0;i<r;i++){
            grid.push([])
            for(j=0;j<c;j++){
                grid[i].push(new TileInfo(i,j))
            }
        }
        return grid
    }

    constructor(width, height){
        this.width = width
        this.height = height
        this.grid = this.emptyTileGrid(height,width)
    }

    isInBounds(x,y){
        return( x>=0 && x<this.width && y>=0 && y<this.height )
    }

    info(x, y){
        if (this.isInBounds(x,y)){
            return this.grid[x][y]
        }else{
            return null
        }
    }

}

