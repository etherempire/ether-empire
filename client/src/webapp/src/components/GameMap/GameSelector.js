// handles all selection logic
// tracks set of all selected tiles, focused tile, neighbors of selected tiles
    // selection will be analyzed for shared available actions

var selected
var focused
var neighbors

export class GameSelector {

    constructor(isInBounds,updateFocusedTile){
        this.gameWidth = 0
        this.gameHeight = 0
        this.isInBounds = isInBounds
        this.updateFocusedTile = updateFocusedTile

        selected = new Set([])
        focused = null
        neighbors = new Set([])
    }

    handleClick(x, y, ctrlKey, shiftKey) {
        if (shiftKey) {
    
        } else if (ctrlKey) {
          this.toggleSelection(x, y);
        } else {
          this.unselectAll();
          this.select(x, y);
        }
      }
    
      handleDrag(x1, y1, x2, y2, ctrlKey, shiftKey) {
        if (shiftKey) {
          if (!ctrlKey) {
            this.unselectAll()
          }
          this.selectRange(x1, y1, x2, y2)
        }
      }

    unselect = (x, y) => {
        selected.delete(`${x}_${y}`)
    }
    unselectAll = () => {
        selected.clear()
    }
    isSelected = (x, y) => {
        return selected.has(`${x}_${y}`)
    }
    toggleSelection = (x, y) => {
        if (this.isSelected(x, y)) {
            this.unselect(x, y)
        } else {
            this.select(x, y)
        }
    }
    selectRange = (x1, y1, x2, y2) => {
        if (this.isInBounds(x1, y1) && this.isInBounds(x2, y2)) {

            var x
            var y
            for (x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
            for (y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
                this.select(x, y)
            }
            }
        }
    }
    select = (x, y) => {
        if (this.isInBounds(x, y)) {
          
          selected.add(`${x}_${y}`);
          const posX = x + this.gameWidth / 2
          const posY = y + this.gameHeight / 2
    
          this.updateFocusedTile(posX,posY)
        }
      }
    
}