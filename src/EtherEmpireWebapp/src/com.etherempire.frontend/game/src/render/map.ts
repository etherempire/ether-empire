import { renderTile } from './tile'
import { Coord, Layer } from '../lib/common'

export function renderMap(args: {
  ctx: CanvasRenderingContext2D
  width: number
  height: number
  size: number
  pan: Coord
  nw: Coord
  se: Coord
  center: Coord
  layers: Layer[]
}) {
  const { ctx, width, height, size, pan, nw, se, center, layers } = args

  ctx.clearRect(0, 0, width, height)

  const halfWidth = width / 2
  const halfHeight = height / 2

  for (const layer of layers) {
    for (let x = nw.x; x < se.x; x++) {
      for (let y = se.y; y < nw.y; y++) {
        const offsetX = (center.x - x) * size + (pan ? pan.x : 0)
        const offsetY = (y - center.y) * size + (pan ? pan.y : 0)

        const tile = layer(x, y)
        if (!tile) {
          continue
        }
        const { color, top, left, topLeft, scale } = tile

        const halfSize = scale ? (size * scale) / 2 : size / 2

        renderTile({
          ctx,
          x: halfWidth - offsetX + halfSize,
          y: halfHeight - offsetY + halfSize,
          size,
          padding: size < 12 ? 0 : size < 18 ? .5 : 1,
          offset: 1,
          color,
          left,
          top,
          topLeft,
          scale
        })
      }
    }
  }
}