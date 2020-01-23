// @format
import React from 'react';
import {connect} from 'react-redux';
import {useDrop} from 'react-dnd';
import {linkVertex} from '../utils/actions';
import {useStyles} from '../style/styling';

export function ChildHandle({vertexId, state, onDrop}) {
  const classes = useStyles();

  const [{highlighted}, drop] = useDrop({
    accept: ['DepotItem'],
    drop: item => {
      onDrop(vertexId, state[`${state.location}_vertices`].length, item.id);
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
    onDrop: (to, from, section) => {
      dispatch({type: 'ADD_VERTEX', section: section});
      dispatch(linkVertex(to, from));
    },
  };
}

export default connect(state => ({state: state}), actionDispatch)(ChildHandle);
