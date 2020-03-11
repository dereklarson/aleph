// @format
import React from 'react';
import _ from 'lodash';
import Vertex from './Vertex';
import {useStyles} from '@style/classes';
import {getAllLineages} from '@utils/vertex';

function renderVertex(
  {vertices, location, focus, prepared},
  ancestry,
  vertex,
  className,
) {
  let type = 'node';
  if (focus === vertex.uid) {
    type = 'card';
  } else if (['docker', 'pipeline'].includes(location)) {
    type = 'node';
  } else if (location === 'configuration') {
    // type = 'conf';
    type = 'node';
  } else if (location === 'data') {
    type = 'table';
  }

  const component = (
    <Vertex
      vertices={vertices}
      type={type}
      uid={vertex.uid}
      ancestry={ancestry}
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

  let lineages = getAllLineages(props.vertices, props.libAssns);

  _.values(props.vertices).forEach(vertex => {
    let ancestry = lineages[vertex.uid];
    vertexDisplay.push(renderVertex(props, ancestry, vertex, classes.vertex));
  });
  return <div>{vertexDisplay}</div>;
}
