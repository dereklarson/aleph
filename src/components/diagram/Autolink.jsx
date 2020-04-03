// @format
import React from 'react';
import {connect} from 'react-redux';
import {useDrop} from 'react-dnd';
import _ from 'lodash';
import {addNewVertex} from '@data/combined';
import {useStyles} from '@style/classes';

export function Autolink({
  location,
  vertices,
  libAssns,
  onDrop,
  relation,
  uid,
  maxParents,
  ancAssns,
}) {
  const classes = useStyles();

  const [{highlighted}, drop] = useDrop({
    accept: ['DepotItem'],
    drop: item => {
      onDrop({
        location,
        uid: item.uid,
        atype: item.atype,
        association: item.uid,
        isParent: relation === 'parent',
        linkId: uid,
      });
    },
    canDrop: (item, monitor) => {
      //TODO figure out how to get a maxParents from an association
      // if ( >= item.maxParents) {
      //   return false;
      // }
      if (
        relation === 'parent' &&
        _.size(vertices[uid].parents) >= maxParents
      ) {
        return false;
      } else {
        return !ancAssns.has(item.uid);
      }
    },
    collect: monitor => ({
      highlighted: monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={drop}
      className={classes.autolink}
      style={{backgroundColor: highlighted ? '#a0aBa0' : null}}
    />
  );
}

export default connect(
  state => ({
    location: state.context.location,
    vertices: state.vertices[state.context.location],
    libAssns: state.associations[state.context.location].library,
    // vertices: state.vertices.present[state.context.location],
  }),
  dispatch => ({onDrop: payload => dispatch(addNewVertex(payload))}),
)(Autolink);
