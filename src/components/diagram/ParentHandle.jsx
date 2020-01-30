// @format
import React from 'react';
import {connect} from 'react-redux';
import {useDrop} from 'react-dnd';
import _ from 'lodash';
import {addVertex, linkVertex} from '@utils/reducers';
import {useStyles} from '@style/styling';
import {getAncestry} from '@utils/vertexHelpers';

export function ParentHandle({location, vertexId, vertices, onDrop}) {
  const classes = useStyles();

  const [{highlighted}, drop] = useDrop({
    accept: ['DepotItem'],
    drop: item => {
      onDrop(location, vertexId, _.size(vertices), item.uid);
    },
    canDrop: (item, monitor) => {
      if (_.size(vertices[vertexId].parents) !== 0) {
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
    onDrop: (location, to, from, section) => {
      dispatch(addVertex({location, uid: section}));
      dispatch(linkVertex({location, from, to}));
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