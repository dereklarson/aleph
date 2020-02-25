export function rescale(position, width, scale, zoom, offset) {
  let edge = 50 * (zoom - offset);
  return Math.floor(edge + scale * ((1 - zoom) * position - width / 2 ));
}

export const dagreRescaling = {
  // A graph will transform linearly from 0 to 'vertex_count_full' vertices,
  // such that small graphs are located more towards the upper left
  vertexCountFull: 10,
  startingScale: 0.7,
  hZoomBase: 0.2,
  vZoomBase: 0.3,
  hOffsetBase: 0,
  vOffsetBase: 0.2,
}

export const arrowStyle = {
  fill: 'none',
  stroke: 'black',
  strokeWidth: '0.5',
}

export const locationStyles = {
  default: {
    dagreRescaling,
    arrowStyle,
    rankdir: 'TB',
    width: 8,
    height: 20,
  },
  data: {
    dagreRescaling,
    arrowStyle,
    rankdir: 'LR',
    width: 20,
    height: 30,
  }
}
