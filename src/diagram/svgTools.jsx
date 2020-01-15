// @format
import React from 'react';

// This function calculates a Bezier pathstring for an SVG path object
// It assumes a vertical orientation and default shape
export function computePathstring(start, end) {
  // The only calculations we need are the average y-position
  var averageY = (start.y + end.y) / 2;
  var source = `M${start.x},${start.y}`;
  var sink = `${end.x},${end.y}`;
  var control = `C${start.x},${averageY} ${end.x},${averageY}`;
  return [source, control, sink].join(' ');
}

export function ArrowMarker() {
  return (
    <marker
      id="triangle"
      viewBox="0 0 10 10"
      refX="0"
      refY="5"
      markerUnits="strokeWidth"
      markerWidth="4"
      markerHeight="3"
      orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" />
    </marker>
  );
}

export default ArrowMarker;
