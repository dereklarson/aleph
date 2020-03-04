// @format
import React from 'react';
import {connect} from 'react-redux';
import {useDrag, useDrop, DragPreviewImage} from 'react-dnd';
import _ from 'lodash';
import {modify} from '@data/reducers';
import {
  addAssociation,
  clearText,
  linkVertex,
  unlinkVertex,
} from '@data/reducers';
import CardVertex from './CardVertex';
import NodeVertex from './NodeVertex';
import ConfigVertex from './ConfigVertex';
import TableVertex from './TableVertex';
import CustomVertex from './CustomVertex';
import Autolink from './Autolink';
import {getAncestry} from '@utils/vertex';

export function PureVertex({
  location,
  vertices,
  associations,
  operations,
  type,
  uid,
  parents,
  prepared,
  dispatch,
}) {
  // First define the Drag-n-Drop functionality
  const ref = React.useRef(null);
  let maxParents = location === 'docker' ? 1 : 3;
  let localLibAssn = _.get(associations.library, uid, []);
  let localStyleAssn = _.get(associations.styles, uid, []);
  if (localLibAssn.length > 0 && localLibAssn[0] === 'ubuntu') {
    maxParents = 0;
  }
  const [{isDragging}, drag, preview] = useDrag({
    item: {type: 'Vertex', uid, maxParents, parents},
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [{highlighted}, drop] = useDrop({
    accept: ['Vertex', 'DepotItem'],
    drop: (item, monitor) => {
      if (item.type === 'Vertex' && _.has(item.parents, uid)) {
        dispatch(unlinkVertex({location, child: item.uid, parent: uid}));
      } else if (item.type === 'DepotItem' && !monitor.didDrop()) {
        let payload = {location, uid, atype: item.atype, association: item.uid};
        console.log('payload', payload);
        dispatch(addAssociation(payload));
        dispatch(clearText(payload));
      } else if (item.type === 'Vertex') {
        dispatch(linkVertex({location, child: item.uid, parent: uid}));
      }
    },
    canDrop: (item, monitor) => {
      if (item.type === 'Vertex') {
        if (item.uid === uid) return false;
        if (_.has(item.parents, uid)) return true;
        if (_.size(item.parents) >= item.maxParents) return false;
        return true;
      } else if (item.type === 'DepotItem') {
        const anc_sec = getAncestry(vertices, associations, uid)[1];
        return !anc_sec.includes(item.uid);
      }
      return true;
    },
    collect: monitor => ({
      highlighted: monitor.canDrop(),
    }),
  });
  drag(drop(ref));
  const [isOver, setOver] = React.useState(false);
  const styleProps = {
    building: operations.building === uid,
    isDragging: isDragging,
    highlighted: highlighted,
    isOver: isOver,
    prepared: prepared.includes(uid),
  };
  const components = {
    custom: CustomVertex,
    conf: ConfigVertex,
    node: NodeVertex,
    card: CardVertex,
    table: TableVertex,
  };
  const CurrentComponent = components[type];
  const zIndex = type === 'card' ? 4 : 3;

  return (
    <div
      ref={ref}
      style={{zIndex: zIndex}}
      onMouseLeave={() => setOver(false)}
      onMouseEnter={() => setOver(true)}>
      <Autolink relation="parent" vertexId={uid} maxParents={maxParents} />
      <DragPreviewImage src="img/icon-plus-20.png" connect={preview} />
      <div
        onClick={event => {
          event.stopPropagation();
          dispatch(modify('context', {focus: uid}));
        }}>
        <CurrentComponent
          uid={uid}
          idlist={_.keys(vertices)}
          libAssn={localLibAssn}
          styleAssn={localStyleAssn}
          styleProps={styleProps}
        />
      </div>
      <Autolink relation="child" vertexId={uid} />
    </div>
  );
}

// ======== DnD Handling ========

export default connect((state, ownProps) => ({
  location: state.context.location,
  vertices: state.vertices[state.context.location],
  associations: state.associations[state.context.location],
  // vertices: state.vertices.present[state.context.location],
  operations: state.operations,
}))(PureVertex);
