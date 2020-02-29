// @format
import React from 'react';
import {connect} from 'react-redux';
import {useDrop} from 'react-dnd';
import _ from 'lodash';
import {addNewVertex} from '@data/combined';
import {useStyles} from '@style/classes';
import {getAncestry} from '@utils/vertex';

export function ParentHandle({
  location,
  maxParents,
  vertexId,
  vertices,
  libAssn,
  onDrop,
}) {
  const classes = useStyles();

  const [{highlighted}, drop] = useDrop({
    accept: ['DepotItem'],
    drop: item => {
      onDrop({
        location,
        uid: item.uid,
        atype: 'library',
        association: item.uid,
        parent: item.uid,
        child: vertexId,
      });
    },
    canDrop: (item, monitor) => {
      if (_.size(vertices[vertexId].parents) >= maxParents) {
        return false;
      } else {
        const anc_sec = getAncestry(vertices, libAssn, vertexId)[1];
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
      className={classes.linkHandle}
      style={{backgroundColor: highlighted ? '#a0aBa0' : null}}
    />
  );
}

export default connect(
  state => ({
    location: state.context.location,
    vertices: state.vertices[state.context.location],
    libAssn: state.associations[state.context.location].library,
    // vertices: state.vertices.present[state.context.location],
  }),
  dispatch => ({onDrop: payload => dispatch(addNewVertex(payload))}),
)(ParentHandle);
