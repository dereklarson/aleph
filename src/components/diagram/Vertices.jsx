// @format
import React from 'react';
import _ from 'lodash';
import Vertex from './Vertex';
import {useStyles} from '@style/styling';

function renderVertex(vertex, activity, className) {
  let type = 'node';
  if (activity.location === 'configuration') {
    type = 'conf';
  } else if (activity.focus === vertex.uid) {
    type = 'card';
  }

  const component = (
    <Vertex
      type={type}
      uid={vertex.uid}
      sections={vertex.sections}
      parents={vertex.parents}
      prepared={activity.prepared}
    />
  );
  return (
    <div
      className={className}
      key={vertex.uid}
      style={{
        left: `${vertex.position.x}%`,
        top: `${vertex.position.y}%`,
        height: `${vertex.position.height}%`,
        width: `${vertex.position.width}%`,
      }}>
      {component}
    </div>
  );
}

export default function Vertices({vertices, activity}) {
  const classes = useStyles();
  const vertexDisplay = [];
  _.values(vertices).forEach(vertex => {
    vertexDisplay.push(renderVertex(vertex, activity, classes.vertex));
  });
  return <div>{vertexDisplay}</div>;
}
