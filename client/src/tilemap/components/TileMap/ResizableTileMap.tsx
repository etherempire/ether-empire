import * as React from 'react'
import { AutoSizer } from 'react-virtualized'

import { TileMap } from './TileMap'
import { Props } from './TileMap.types'
import { renderMap } from '../../render/map'

type ResizableProps = Omit<Props, 'width' | 'height'>
const resizableDefaultProps = {
  x: 0,
  y: 0,
  className: '',
  initialX: 0,
  initialY: 0,
  size: 14,
  zoom: 1,
  minSize: 7,
  maxSize: 40,
  minX: -150,
  maxX: 150,
  minY: -150,
  maxY: 150,
  panX: 0,
  panY: 0,
  padding: 4,
  isDraggable: true,
  renderMap: renderMap
}

export class ResizableTileMap extends React.PureComponent<ResizableProps> {
  static defaultProps = resizableDefaultProps
    props!: Props
  render() {
    return <AutoSizer>{props => <TileMap {...props} {...this.props} />}</AutoSizer>
  }
}