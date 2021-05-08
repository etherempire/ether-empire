export function renderTile(args: {
    ctx: CanvasRenderingContext2D
    x: number
    y: number
    size: number
    padding: number
    offset: number
    color: string
    left?: boolean
    top?: boolean
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

  }) {
    const { ctx, x, y, size, padding, offset, color, left, top, topLeft, scale, 
      outlineLeft, outlineTop, outlineRight, outlineBottom, outlineTopLeft, outlineTopRight, outlineBottomLeft, outlineBottomRight, outlineColor, outlineWidth } = args
    const tileSize = scale ? size * scale : size
    const strokeWidth = outlineWidth ? size * outlineWidth : 1

    ctx.fillStyle = color

    if (outlineColor){
      ctx.strokeStyle = outlineColor
    }
  
    ctx.lineWidth = strokeWidth
    
      if (!top && !left) {
        // disconnected everywhere: it's a square
        ctx.fillRect(
          x - tileSize + padding,
          y - tileSize + padding,
          tileSize - padding,
          tileSize - padding
        )
      } else if (top && left && topLeft) {
        // connected everywhere: it's a square
        ctx.fillRect(
          x - tileSize - offset,
          y - tileSize - offset,
          tileSize + offset,
          tileSize + offset
        )
      } else {
        if (left) {
          // connected left: it's a rectangle
          ctx.fillRect(
            x - tileSize - offset,
            y - tileSize + padding,
            tileSize + offset,
            tileSize - padding
          )
        }
        if (top) {
          // connected top: it's a rectangle
          ctx.fillRect(
            x - tileSize + padding,
            y - tileSize - offset,
            tileSize - padding,
            tileSize + offset
          )
        }
      }

      const halfStroke = strokeWidth/2
      const leftX = x - tileSize - halfStroke
      const rightX = x + halfStroke
      const topY = y - tileSize - halfStroke
      const bottomY = y + halfStroke
      
      ctx.beginPath();


      //left line
      ctx.moveTo(leftX, bottomY+halfStroke);
      if(outlineBottomLeft){
        ctx.lineTo(leftX, bottomY-halfStroke);
      }else{
        ctx.moveTo(leftX, bottomY-halfStroke);
      }
      
      if(outlineLeft){
        ctx.lineTo(leftX,topY+halfStroke);
      }else{
        ctx.moveTo(leftX,topY+halfStroke);
      }

      //top line
      ctx.moveTo(leftX-halfStroke, topY);
      if(outlineTopLeft){
        ctx.lineTo(leftX+halfStroke,topY)
      }else{
        ctx.moveTo(leftX+halfStroke,topY)
      }

      if(outlineTop){
        ctx.lineTo(rightX-halfStroke,topY)
      }else{
        ctx.moveTo(rightX-halfStroke,topY)
      }

      //right line
      ctx.moveTo(rightX, topY-halfStroke);
      if(outlineTopRight){
        ctx.lineTo(rightX, topY+halfStroke);
      }ctx.moveTo(rightX, topY+halfStroke);

      if(outlineRight){
        ctx.lineTo(rightX,bottomY-halfStroke)
      }else{
        ctx.moveTo(rightX,bottomY-halfStroke)
      }

      //bottom line
      ctx.moveTo(rightX+halfStroke, bottomY);
      if(outlineBottomRight){
        ctx.lineTo(rightX-halfStroke, bottomY)
      }else{
        ctx.moveTo(rightX-halfStroke, bottomY)
      }

      if(outlineBottom){
        ctx.lineTo(leftX+halfStroke,bottomY)
      }else{
        ctx.moveTo(leftX+halfStroke,bottomY)
      }

      ctx.stroke();


    
  }