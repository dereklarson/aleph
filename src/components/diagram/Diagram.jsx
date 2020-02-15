// @format
import React from 'react';
import {connect} from 'react-redux';
import {useDrop} from 'react-dnd';
import {Paper} from '@material-ui/core';
import {createSelector} from 'reselect';
import _ from 'lodash';
import Arrows from './Arrows';
import Graph from './Graph';
import {calculateDiagramPositions} from './diagramDrawing';
import {useStyles} from '@style/styling';
import {modify, addVertex, addAssociation} from '@data/reducers';

export function PureDiagram({
  location,
  clearFocus,
  onDepotDrop,
  vertices,
  activity,
}) {
  const classes = useStyles();

  const [{highlighted}, drop] = useDrop({
    accept: 'DepotItem',
    drop: (item, monitor) => {
      if (!monitor.didDrop()) {
        onDepotDrop({location, uid: item.uid, association: item.uid});
      }
    },
    collect: monitor => ({
      highlighted: !!monitor.canDrop(),
    }),
  });

  var verticesToDisplay = _.cloneDeep(vertices);

  // Add positional information for vertices and get arrow coordinates
  var arrows = calculateDiagramPositions(verticesToDisplay, location);

  var onClick = () => 0;
  if (activity.focus !== null) onClick = clearFocus;

  return (
    <div ref={drop}>
      <Paper
        onClick={onClick}
        className={classes.paperDrawing}
        style={{backgroundColor: highlighted ? '#E0FBE0' : null}}>
        <Arrows arrows={arrows} />
        <Graph vertices={verticesToDisplay} activity={activity} />
      </Paper>
    </div>
  );
}

const getFocus = state => state.context.focus;
const getLocation = state => state.context.location;
const getBuildOrders = state => state.operations.build_orders;
const getDagre = state => state.context.dagre;

const getActivity = createSelector(
  [getFocus, getLocation, getBuildOrders, getDagre],
  (focus, location, buildOrders, dagre) => ({
    focus: focus,
    location: location,
    prepared: buildOrders.map(({uid}) => uid),
    dagre: dagre,
  }),
);

export default connect(
  state => ({
    location: state.context.location,
    vertices: state.vertices[state.context.location],
    // vertices: state.vertices.present[state.context.location],
    activity: getActivity(state),
  }),
  dispatch => ({
    clearFocus: () => dispatch(modify('context', {focus: null})),
    onDepotDrop: payload => {
      dispatch(addVertex(payload));
      dispatch(addAssociation(payload));
    },
  }),
)(PureDiagram);
