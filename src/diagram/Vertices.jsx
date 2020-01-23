// @format
import React from 'react';
import Vertex from './Vertex';
import {useStyles} from '../style/styling';

function renderVertex(index, vertex, activity, className) {
  let type = 'node';
  if (activity.location === 'configuration') {
    type = 'conf';
  } else if (activity.focus === index) {
    type = 'card';
  }

  const component = (
    <Vertex
      type={type}
      id={index}
      name={vertex.name}
      sections={vertex.sections}
      parents={vertex.parents}
      prepared={activity.prepared}
    />
  );
  return (
    <div
      className={className}
      key={index}
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
  for (const [index, vertex] of vertices.entries()) {
    vertexDisplay.push(renderVertex(index, vertex, activity, classes.vertex));
  }
  return <div>{vertexDisplay}</div>;
}
