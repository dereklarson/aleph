// @format
import React from 'react';
import {connect} from 'react-redux';
import {useDrop} from 'react-dnd';
// import _ from 'lodash';
import {addNewVertex} from '@data/combined';
import {useStyles} from '@style/classes';
import {getAncestry} from '@utils/vertex';

export function ChildHandle({location, vertexId, vertices, libAssn, onDrop}) {
  const classes = useStyles();

  const [{highlighted}, drop] = useDrop({
    accept: ['DepotItem'],
    drop: item => {
      onDrop({
        location,
        uid: item.uid,
        atype: item.atype,
        association: item.uid,
        isParent: false,
        linkId: vertexId,
      });
    },
    canDrop: (item, monitor) => {
      //TODO figure out how to get a maxParents from an association
      // if ( >= item.maxParents) {
      //   return false;
      // }
      const anc_sec = getAncestry(vertices, libAssn, vertexId)[1];
      return !anc_sec.includes(item.uid);
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
)(ChildHandle);
