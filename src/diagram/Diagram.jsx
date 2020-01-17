// @format
import React from 'react';
import {connect} from 'react-redux';
import {useDrop} from 'react-dnd';
import {Paper} from '@material-ui/core';
import _ from 'lodash';
import Arrows from './Arrows';
import Vertices from './Vertices';
import {calculateDiagramPositions} from './diagramDrawing';
import {useStyles} from '../style/styling';

export function PureDiagram({onClick, onSectionDrop, vertices, activity}) {
  const classes = useStyles();

  const [{highlighted, isOver}, drop] = useDrop({
    accept: 'DepotItem',
    drop: (item, monitor) => {
      // Ensure we don't double drop in case of ghost vertex creation
      if (!monitor.didDrop()) {
        onSectionDrop(item.id);
      }
    },
    collect: monitor => ({
      highlighted: monitor.canDrop(),
      isOver: !!monitor.isOver(),
    }),
  });

  // We'll add some 'ghost' vertices for smarter dropping
  var verticesToDisplay = [];
  var ghostVertices = [];
  if (isOver === true) {
    for (const [index, vertex] of vertices.entries()) {
      var currVertex = _.cloneDeep(vertex);
      // Only add ghosts to leaves for now
      if (vertex.children.length !== 0) {
        verticesToDisplay.push(currVertex);
        continue;
      }

      // Add ghost as a child
      verticesToDisplay.push({
        ...currVertex,
        children: [vertices.length + ghostVertices.length],
      });
      // create ghost
      ghostVertices.push({
        name: `<${vertices.length}`,
        sections: [],
        children: [],
        parents: [index],
      });
    }
  } else verticesToDisplay = _.cloneDeep(vertices);
  verticesToDisplay = verticesToDisplay.concat(ghostVertices);

  // Add positional information for vertices and get arrow coordinates
  var arrows = calculateDiagramPositions(verticesToDisplay, activity.dagre);

  return (
    <div ref={drop}>
      <Paper
        onClick={onClick}
        className={classes.paperDrawing}
        style={{backgroundColor: highlighted ? '#E0FBE0' : null}}>
        <Arrows arrows={arrows} />
        <Vertices vertices={verticesToDisplay} activity={activity} />
      </Paper>
    </div>
  );
}

export const addVertex = (section = null) => ({
  type: 'ADD_VERTEX',
  section: section,
});

export default connect(
  state => ({
    vertices: state[`${state.location}_vertices`],
    activity: {
      focus: state.focus,
      location: state.location,
      prepared: state.build_orders.map(({id}) => id),
      dagre: state.dagre,
    },
  }),
  dispatch => ({
    onClick: () => dispatch({type: 'MODIFY_STATE', update: {focus: null}}),
    onSectionDrop: section => dispatch(addVertex(section)),
  }),
)(PureDiagram);
