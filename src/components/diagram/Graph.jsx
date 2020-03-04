// @format
import React from 'react';
import _ from 'lodash';
import Vertex from './Vertex';
import {useStyles} from '@style/classes';

function renderVertex({location, focus, prepared}, vertex, className) {
  let type = 'custom';
  if (focus === vertex.uid) {
    type = 'card';
  } else if (['docker', 'pipeline'].includes(location)) {
    type = 'node';
  } else if (location === 'configuration') {
    type = 'conf';
  } else if (location === 'data') {
    type = 'table';
  }

  const component = (
    <Vertex
      type={type}
      uid={vertex.uid}
      parents={vertex.parents}
      prepared={prepared}
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

export default function Graph(props) {
  const classes = useStyles();
  const vertexDisplay = [];
  _.values(props.vertices).forEach(vertex => {
    vertexDisplay.push(renderVertex(props, vertex, classes.vertex));
  });
  return <div>{vertexDisplay}</div>;
}
