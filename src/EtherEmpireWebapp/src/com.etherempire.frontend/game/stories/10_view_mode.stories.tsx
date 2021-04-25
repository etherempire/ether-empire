import * as React from 'react'

import { storiesOf } from '@storybook/react'
import { TileMap, Layer } from '../src'


import './stories.css'
import { TileData } from './lib/tiledata.types'

const size = 100
let atlas: Array<Array<number>> | null = null

async function loadTiles() {

  function randomTile(){
    const roll = Math.random()
    return roll < .05 ? 3 : roll < .15 ? 2 : roll < .5 ? 1 : 0
  }



  var dataString = ""
  for (var i = 0; i < size; i++){
    for (var j = 0; j < size; j++){
      dataString +='['+i+','+j+','+randomTile()+']'
      if (i != size-1 || j != size-1){
        dataString+=','
      }
    }
  }

  var json = `{"data":[` + dataString + `]}`

  const tileData = JSON.parse(json)["data"]
  atlas = tileData as Array<Array<number>>

}

loadTiles().catch(console.error)

export const COLOR_BY_TYPE = Object.freeze({
  0: '#725438', //blank (brown)
  1: '#46A908', //farm (green)
  2: '#696969', //wall (dark grey)
  3: '#ff0000', //enemy army
  4: '#0000ff', //friendly army
  5: '#d3d3d3' //loading
})



const tileTypeLayer: Layer = (x, y) => {

  if (x < size && x >= 0 && y < size && y >= 0){

  const index =  size * y + x
  if (atlas !== null && atlas.length > index) {
    const tile = atlas[index]
    const color = COLOR_BY_TYPE[tile[2]]
    return {
      color: color
    }
  } else {
    return {
      color: COLOR_BY_TYPE[5]
    }
  }
} else {
  return {color: COLOR_BY_TYPE[5]}
}
}

var selectedTileData: TileData = {x:0,y:0,yield:0,owner:0,value:0,type:0}

function onTileClick(x: number, y: number){
  console.log("User has clicked ("+x+","+y+"), sending tile data to parent.")
  selectedTileData = lookupTileData(x,y)
}

function lookupTileData(x: number, y:number){
  if (x < size && x >= 0 && y < size && y >= 0){
    const index =  size * y + x
    if (atlas !== null && atlas.length > index) {
      const tile = atlas[index]
      return convertToTileData(tile)
    } else {
      return {x:x,y:y,yield:0,owner:0,value:0,type:5}
    }
  } else {
    return {x:x,y:y,yield:0,owner:0,value:0,type:5}
  }
}

function convertToTileData(data: Array<number>){
  return {x:data[0],y:data[1],yield:0,owner:0,value:0,type:data[2]}
}

storiesOf('TileMap', module).add('10. Ether Empire view mode', () => 
    <div id="root">
      <TileMap layers={[tileTypeLayer]} onClick={onTileClick}/>
      <h1>Hello, world</h1>
    </div>
    )