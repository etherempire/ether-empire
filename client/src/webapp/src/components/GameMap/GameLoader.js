import { Atlas } from "../TileInfo/Atlas"
export class GameLoader{
    constructor(web3, updateGameSize, updateAtlas){
        this.updateGameSize = updateGameSize
        this.updateAtlas = updateAtlas
        this.web3 = web3.web3
        this.instance = web3.instance
        this.accounts = web3.accounts
        this.gameWidth = 0
        this.gameHeight = 0

        if (this.accounts.length != 0 && this.instance) {
            this.getWorldMapData();
        }
    }

    async getWidthHeight() {
        this.gameWidth = await this.instance.methods.map_width().call({ from: this.accounts[0], gasLimit: 1000000 })
        this.gameHeight = await this.instance.methods.map_height().call({ from: this.accounts[0], gasLimit: 1000000 })
        this.mapArea = this.gameHeight * this.gameWidth
    }

    async getWorldMapData() {
        
        // retieve and update game width and height
        await this.getWidthHeight()
        this.updateGameSize(this.gameWidth, this.gameHeight)
    
        // initialize and update atlas
        const atlasInProgress = new Atlas(this.gameWidth, this.gameHeight)
        this.updateAtlas(atlasInProgress);
    
        var i
        var j
        var curIndex = 0
        // get tile + farm/wall info
        for (i = 0; i < this.gameHeight; i++) {
          for (j = 0; j < this.gameWidth; j++) {

            // is there a tile here?
            const tileData = await this.instance.methods.allEntities(curIndex).call({ from: this.accounts[0] })
            var curTile = atlasInProgress.info(j, i)
            curTile.isTile = tileData.entityType != 0
            var yeildModifier = Math.round( (tileData.qualifier2_32x32/(2**32)) * 1000)/1000

            // what is the tile type if any?
            if (curTile.isTile) {
                const tileType = await this.instance.methods.allEntities(this.mapArea + curIndex).call({ from: this.accounts[0] })
                var id = tileType.id
                curTile.modifier = yeildModifier
                curTile.value = Math.round( (tileType.qualifier2_32x32/(2**32)) * 1000)/1000
                if (tileType.entityType == 2) {
                    //wall
                    curTile.isWall = true
                    curTile.isEmpty = false
                } else if (tileType.entityType == 4) {
                    //farm
                    curTile.isFarm = true
                    curTile.isEmpty = false
                    curTile.owner = await this.instance.methods.getEntityOwner(id).call({ from: this.accounts[0] })
                }
            }
            curIndex += 1
          }
        }
        
        // get entity data here

      }
}
