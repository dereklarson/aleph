// @format
import React from 'react';
import {connect} from 'react-redux';
import {useDrop} from 'react-dnd';
import {Paper} from '@material-ui/core';
import _ from 'lodash';
import Arrows from './Arrows';
import Graph from './Graph';
import {calculateDiagramPositions} from './diagramDrawing';
// import {useStyles} from '@style/classes';
import {modify} from '@data/reducers';
import {addNewVertex} from '@data/combined';

export function PureDiagram({
  clearFocus,
  onDepotDrop,
  vertices,
  libAssns,
  location,
  focus,
  buildOrders,
}) {
  // const classes = useStyles();
  const [{highlighted}, drop] = useDrop({
    accept: 'DepotItem',
    drop: (item, monitor) => {
      if (!monitor.didDrop())
        onDepotDrop({...item, location, association: item.uid});
    },
    collect: monitor => ({
      highlighted: !!monitor.canDrop(),
    }),
  });

  // Add positional information for vertices and get arrow coordinates
  var verticesToDisplay = _.cloneDeep(vertices);
  var arrows = calculateDiagramPositions(verticesToDisplay, location);

  var onClick = () => 0;
  if (focus !== null) onClick = () => clearFocus(location);

  let props = {
    libAssns,
    location,
    focus,
    prepared: buildOrders.map(({uid}) => uid),
  };

  return (
    <div ref={drop}>
      <Paper
        onClick={onClick}
        style={{
          position: 'relative',
          border: highlighted ? '1px solid lightgreen' : null,
        }}>
        <Arrows arrows={arrows} />
        <Graph vertices={verticesToDisplay} {...props} />
      </Paper>
    </div>
  );
}

export default connect(
  state => ({
    location: state.context.location,
    vertices: state.vertices[state.context.location],
    // vertices: state.vertices.present[state.context.location],
    libAssns: state.associations[state.context.location].library,
    focus: state.environment[state.context.location].focus,
    buildOrders: state.operations.build_orders,
  }),
  dispatch => ({
    clearFocus: location =>
      dispatch(modify('environment', {locator: [location], focus: null})),
    onDepotDrop: payload => dispatch(addNewVertex(payload)),
  }),
)(PureDiagram);
