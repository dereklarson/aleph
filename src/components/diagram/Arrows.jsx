// @format
import React from 'react';
import _ from 'lodash';
import {ArrowMarker, computePathstring} from './svgTools';
import {locationStyles} from '@style/styleDiagram';

function renderArrow(arrow, index, style) {
  return (
    <path
      key={index}
      d={computePathstring(arrow.start, arrow.end, style.rankdir)}
      style={style.arrowStyle}
      markerEnd="url(#triangle)"
    />
  );
}

export default function Arrows({location, arrows}) {
  const style = _.get(locationStyles, location, locationStyles.default);
  const arrowDisplay = [];
  arrows.forEach(function(arrow, index) {
    arrowDisplay.push(renderArrow(arrow, index, style));
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
