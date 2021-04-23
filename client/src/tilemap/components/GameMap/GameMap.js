import * as React from 'react'

import { TileMap } from '../TileMap/TileMap'
import {  Layer } from '../../lib/common'
import { Component } from 'react'

const simpleLayer  = (x, y) => {
  return {
    color: '#cccccc'
  }
}


class GameMap extends Component {
    render() {
      return (
        <div>
          <TileMap layers={[simpleLayer]} />
        </div>
      );
    }
  }
  
export default GameMap
