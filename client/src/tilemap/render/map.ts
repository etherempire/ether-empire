import { renderTile } from './tile'
import { Coord, Layer } from '../lib/common'

var hexToRgbaLookup = new Map()
function hexToRgba(hex: string) {
  if (hex in hexToRgbaLookup){
    return hexToRgbaLookup.get(hex)
  }else{
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var rgba = result ? [parseInt(result[1], 16),parseInt(result[2], 16),parseInt(result[3], 16),255]: [0,0,0,0];
    hexToRgbaLookup.set(hex,rgba)
    return rgba
  }
}

export function renderMap(args: {
  ctx: CanvasRenderingContext2D
  width: number
  height: number
  gameWidth: number
  gameHeight: number
  size: number
  pan: Coord
  nw: Coord
  se: Coord
  center: Coord
  layers: Layer[]
}) {
  const { ctx, width, height, size, pan, nw, se, center, layers } = args

  ctx.fillStyle = "#000000" //black background
  ctx.fillRect(0, 0, width, height)

  const halfWidth = width / 2
  const halfHeight = height / 2

  const gameWidth = se.x - nw.x
  const gameHeight =  nw.y - se.y
  const miniMap = new Uint8ClampedArray(4*gameWidth*gameHeight);

  for (const layer of layers) {
    for (let x = nw.x; x < se.x; x++) {
      for (let y = se.y; y < nw.y; y++) {
        const offsetX = (center.x - x) * size + (pan ? pan.x : 0)
        const offsetY = (y - center.y) * size + (pan ? pan.y : 0)

        const tile = layer(x, y)
        if (!tile) {
          continue
        }
        const { color, top, left, topLeft, scale, 
          outlineLeft,
          outlineTop,
          outlineRight,
          outlineBottom,
          outlineTopLeft,
          outlineTopRight,
          outlineBottomLeft,
          outlineBottomRight,
          outlineColor,
          outlineWidth } = tile

        //update miniMap
        const relX = x+gameWidth/2
        const relY = y+gameHeight/2
        const startIndex = 4*( gameWidth*(gameHeight - relY) + relX)
        const rgba = hexToRgba(color)
        for(let i = 0; i<4; i++){
          miniMap[startIndex+i]=rgba[i]
        }

        //do not render rects if size<=1
        if (size>1){

          const halfSize = scale ? (size * scale) / 2 : size / 2

          renderTile({
            ctx,
            x: halfWidth - offsetX + halfSize,
            y: halfHeight - offsetY + halfSize,
            size,
            padding: size<10?0 : size<15?.2 : size<20?.3 : size<25?.4 : size<30?.5 : 1,
            offset: 1,
            color,
            left,
            top,
            topLeft,
            scale: size<10? Math.max(1.1,scale ? scale : 1) : scale,
            outlineLeft,
            outlineTop,
            outlineRight,
            outlineBottom,
            outlineTopLeft,
            outlineTopRight,
            outlineBottomLeft,
            outlineBottomRight,
            outlineColor,
            outlineWidth

          })

        }
      }
    }
  }

  //render saved miniMap if size <= 1
  if (size<=1){
      let imageData = new ImageData(miniMap, gameWidth, gameHeight);
      const offsetX = (center.x) + (pan ? pan.x : 0)
      const offsetY = (-center.y) + (pan ? pan.y : 0)
      ctx.putImageData(imageData, halfWidth - offsetX - gameWidth/2, halfHeight - offsetY - gameHeight/2);
  }
}