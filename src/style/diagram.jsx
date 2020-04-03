// @format
export function rescale(position, scale, offset) {
  return Math.floor(position * scale + offset);
}

// export function rescale(position, width, scale, zoom, offset) {
//   let edge = 50 * (zoom - offset);
//   return Math.floor(edge + scale * ((1 - zoom) * position - width / 2 ));
// }

export const dagreRescaling = {
  // A graph will transform linearly from 0 to 'vertex_count_full' vertices,
  // such that small graphs are located more towards the upper left
  vertexCountFull: 10,
  h0: 0.8,
  v0: 0.6,
};

export const arrowStyle = {
  fill: 'none',
  stroke: 'black',
  strokeWidth: '0.5',
};

export const locationStyles = {
  default: {
    dagreRescaling,
    arrowStyle,
    rankdir: 'TB',
    width: 12,
    height: 5,
  },
  data: {
    dagreRescaling,
    arrowStyle,
    rankdir: 'LR',
    width: 20,
    height: 30,
  },
};
