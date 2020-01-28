// @format
import React from 'react';
import {ArrowMarker, computePathstring} from './svgTools';

function renderArrow(arrow, index) {
  return (
    <path
      key={index}
      d={computePathstring(arrow.start, arrow.end)}
      style={{fill: 'none', stroke: 'black', strokeWidth: '0.5'}}
      markerEnd="url(#triangle)"
    />
  );
}

export default function Arrows({arrows}) {
  const arrowDisplay = [];
  arrows.forEach(function(arrow, index) {
    arrowDisplay.push(renderArrow(arrow, index));
  });

  return (
    <svg
      style={{width: '100%', height: '100%'}}
      viewBox="0 0 100 100"
      preserveAspectRatio="none">
      <ArrowMarker />
      {arrowDisplay}
    </svg>
  );
}
