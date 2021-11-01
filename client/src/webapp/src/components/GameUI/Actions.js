// indicate available actions with tile + neighbors
const direction = {
    NORTH: 0,
    SOUTH: 1,
    EAST: 2,
    WEST: 3
  }

export class Actions{

    getNeighbor(dir, neighbors){
        var neighbor
        if (dir == direction.NORTH) {
          neighbor = neighbors.NORTH
        } if (dir == direction.SOUTH) {
          neighbor = neighbors.SOUTH
        } if (dir == direction.EAST) {
          neighbor = neighbors.EAST
        } if (dir == direction.WEST) {
          neighbor = neighbors.WEST
        }
        return neighbor
      }

    movableNeighbor = (neighbors) => {
        for (var i = 0; i < 4; i++) {
          if (this.canMove(i,neighbors)) {
            return true
          }
        }
        return false
      }
    
      attackableNeighbor = (neighbors) => {
        for (var i = 0; i < 4; i++) {
          if (this.canAttack(i,neighbors)) {
            return true
          }
        }
        return false
      }
    
      destroyableNeighbor = (neighbors) => {
        for (var i = 0; i < 4; i++) {
          if (this.canDestroy(i,neighbors)) {
            return true
          }
        }
        return false
      }
    
      canMove = (dir, neighbors) => {
        var neighbor = this.getNeighbor(dir, neighbors)
        return neighbor != null && (neighbor.isEmpty || neighbor.isFarm) && !neighbor.containsArmy
      }
    
      canAttack = (dir, neighbors) => {
        var neighbor = this.getNeighbor(dir, neighbors)
        return neighbor != null && neighbor.containsArmy
      }
    
      canDestroy = (dir, neighbors) => {
        var neighbor = this.getNeighbor(dir, neighbors)
        return neighbor != null && neighbor.isWall
      }
}