// @format
import React from 'react';
import {connect} from 'react-redux';
import {useDrop} from 'react-dnd';
import {Paper} from '@material-ui/core';
import {createSelector} from 'reselect';
import _ from 'lodash';
import Arrows from './Arrows';
import Vertices from './Vertices';
import {calculateDiagramPositions} from './diagramDrawing';
import {useStyles} from '../style/styling';

export function PureDiagram({clearFocus, onSectionDrop, vertices, activity}) {
  const classes = useStyles();

  const [{highlighted}, drop] = useDrop({
    accept: 'DepotItem',
    drop: (item, monitor) => {
      if (!monitor.didDrop()) {
        onSectionDrop(item.id);
      }
    },
    collect: monitor => ({
      highlighted: !!monitor.canDrop(),
      // isOver: !!monitor.isOver(),
    }),
  });

  var verticesToDisplay = _.cloneDeep(vertices);

  // Add positional information for vertices and get arrow coordinates
  var arrows = calculateDiagramPositions(verticesToDisplay, activity.dagre);

  var onClick = () => 0;
  if (activity.focus !== null) onClick = clearFocus;

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

const getFocus = state => state.focus;
const getLocation = state => state.location;
const getBuildOrders = state => state.build_orders;
const getDagre = state => state.dagre;

const getActivity = createSelector(
  [getFocus, getLocation, getBuildOrders, getDagre],
  (focus, location, buildOrders, dagre) => ({
    focus: focus,
    location: location,
    prepared: buildOrders.map(({id}) => id),
    dagre: dagre,
  }),
);

export default connect(
  state => ({
    vertices: state[`${state.location}_vertices`],
    activity: getActivity(state),
  }),
  dispatch => ({
    clearFocus: () => dispatch({type: 'MODIFY_STATE', update: {focus: null}}),
    onSectionDrop: section => dispatch(addVertex(section)),
  }),
)(PureDiagram);
