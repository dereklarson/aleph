// @format
import React from 'react';
import {connect} from 'react-redux';
import {useDrop} from 'react-dnd';
import {linkVertex} from '@utils/actions';
import {useStyles} from '@style/styling';

export function ChildHandle({location, vertexId, vertices, onDrop}) {
  const classes = useStyles();

  const [{highlighted}, drop] = useDrop({
    accept: ['DepotItem'],
    drop: item => {
      onDrop(location, vertexId, vertices.length, item.id);
    },
    canDrop: (item, monitor) => {
      return true;
    },
    collect: monitor => ({
      highlighted: monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={drop}
      className={classes.childHandle}
      style={{backgroundColor: highlighted ? '#a0aBa0' : null}}
    />
  );
}

function actionDispatch(dispatch) {
  return {
    onDrop: (location, to, from, section) => {
      dispatch({type: 'ADD_VERTEX', location: location, section: section});
      dispatch(linkVertex(location, to, from));
    },
  };
}

export default connect(
  state => ({
    location: state.context.location,
    vertices: state.vertices.present[state.context.location],
  }),
  actionDispatch,
)(ChildHandle);
