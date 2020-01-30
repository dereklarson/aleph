// @format
import React from 'react';
import {connect} from 'react-redux';
import {useDrag, useDrop, DragPreviewImage} from 'react-dnd';
import _ from 'lodash';
import {prepareFocusedBuild} from '@utils/loaders';
import {modify} from '@utils/reducers';
import {
  addSection,
  removeAllSections,
  linkVertex,
  unlinkVertex,
} from '@utils/reducers';
import CardVertex from './CardVertex';
import NodeVertex from './NodeVertex';
import ConfigNodeVertex from './ConfigNodeVertex';
import ChildHandle from './ChildHandle';
import ParentHandle from './ParentHandle';
import {HotKeys} from 'react-hotkeys';
import {getAncestry} from '@utils/vertexHelpers';

export function PureVertex({
  location,
  vertices,
  operations,
  onClick,
  cardActions,
  dropActions,
  type,
  uid,
  sections,
  parents,
  prepared,
}) {
  // First define the Drag-n-Drop functionality
  const ref = React.useRef(null);
  const setFocus = () => {
    ref.current && ref.current.focus();
  };
  const [{isDragging}, drag, preview] = useDrag({
    item: {type: 'Vertex', uid: uid, parents: parents},
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [{highlighted}, drop] = useDrop({
    accept: ['Vertex', 'DepotItem'],
    drop: (item, monitor) => {
      if (item.type === 'Vertex' && _.has(item.parents, uid)) {
        dropActions.Unlink({location, child: item.uid, parent: uid});
      } else if (item.type === 'DepotItem' && !monitor.didDrop()) {
        dropActions[item.type]({location, uid: uid, section: item.uid});
      } else if (item.type === 'Vertex') {
        dropActions[item.type]({location, child: item.uid, parent: uid});
      }
    },
    canDrop: (item, monitor) => {
      if (item.type === 'Vertex') {
        if (item.uid === uid) return false;
        if (_.has(item.parents, uid)) return true;
        if (_.size(item.parents) !== 0) return false;
        return true;
      } else if (item.type === 'DepotItem') {
        const anc_sec = getAncestry(vertices, uid)[1];
        return !anc_sec.includes(item.uid);
      }
      return true;
    },
    collect: monitor => ({
      highlighted: monitor.canDrop(),
    }),
  });
  drag(drop(ref));

  const styleProps = {
    building: operations.building === uid,
    isDragging: isDragging,
    highlighted: highlighted,
    prepared: prepared.includes(uid),
  };
  const components = {
    conf: ConfigNodeVertex,
    node: NodeVertex,
    card: CardVertex,
  };
  const CurrentComponent = components[type];
  const zIndex = type === 'card' ? 4 : 3;

  const deleteNode = React.useCallback(() => {
    cardActions.onClear({location, uid});
  }, [location, cardActions, uid]);

  const handlers = {
    DELETE_NODE: deleteNode,
  };

  return (
    <div ref={ref} style={{zIndex: zIndex}} onMouseEnter={setFocus}>
      <HotKeys handlers={handlers}>
        <ParentHandle vertexId={uid} />
        <DragPreviewImage src="img/icon-plus-20.png" connect={preview} />
        <div
          onClick={event => {
            event.stopPropagation();
            onClick(uid);
          }}>
          <CurrentComponent
            uid={uid}
            cardActions={cardActions}
            sections={sections}
            styleProps={styleProps}
          />
        </div>
        <ChildHandle vertexId={uid} />
      </HotKeys>
    </div>
  );
}

// ======== DnD Handling ========

function actionDispatch(dispatch) {
  return {
    onClick: uid => dispatch(modify('context', {focus: uid})),
    cardActions: {
      onEditor: payload =>
        dispatch(modify('context', {...payload, editing: true})),
      onBuild: () => dispatch(prepareFocusedBuild()),
      onClear: payload => dispatch(removeAllSections(payload)),
    },
    dropActions: {
      Vertex: payload => dispatch(linkVertex(payload)),
      DepotItem: payload => dispatch(addSection(payload)),
      Unlink: payload => dispatch(unlinkVertex(payload)),
    },
  };
}

export default connect(
  state => ({
    location: state.context.location,
    vertices: state.vertices[state.context.location],
    // vertices: state.vertices.present[state.context.location],
    operations: state.operations,
  }),
  actionDispatch,
)(PureVertex);
