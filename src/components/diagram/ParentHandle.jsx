// @format
import React from 'react';
import {connect} from 'react-redux';
import {useDrop} from 'react-dnd';
import _ from 'lodash';
import {addVertex, linkVertex} from '@data/reducers';
import {useStyles} from '@style/styling';
import {getAncestry} from '@utils/vertex';

export function ParentHandle({location, vertexId, vertices, onDrop}) {
  const classes = useStyles();

  const maxParents = location === 'docker' ? 1 : 3;

  const [{highlighted}, drop] = useDrop({
    accept: ['DepotItem'],
    drop: item => {
      onDrop(location, vertexId, item.uid);
    },
    canDrop: (item, monitor) => {
      if (_.size(vertices[vertexId].parents) >= maxParents) {
        return false;
      } else {
        const anc_sec = getAncestry(vertices, vertexId)[1];
        return !anc_sec.includes(item.uid);
      }
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
    onDrop: (location, child, section) => {
      dispatch(addVertex({location, uid: section}));
      dispatch(linkVertex({location, child, parent: section}));
    },
  };
}

export default connect(
  state => ({
    location: state.context.location,
    vertices: state.vertices[state.context.location],
    // vertices: state.vertices.present[state.context.location],
  }),
  actionDispatch,
)(ParentHandle);
