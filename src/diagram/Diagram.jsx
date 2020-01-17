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
      if (!monitor.didDrop()) {
        onSectionDrop(item.id);
      }
    },
    collect: monitor => ({
      highlighted: monitor.canDrop(),
      isOver: !!monitor.isOver(),
    }),
  });

  var verticesToDisplay = _.cloneDeep(vertices);

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
