// @format
import React from 'react';
import Vertex from './Vertex';

function renderVertex(index, vertex, activity) {
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
      key={index}
      style={{
        border: '1px dashed red',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
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
  const vertexDisplay = [];
  for (const [index, vertex] of vertices.entries()) {
    vertexDisplay.push(renderVertex(index, vertex, activity));
  }
  return <div>{vertexDisplay}</div>;
}
