// @format
import React from 'react';
import {connect} from 'react-redux';
import {useDrag, useDrop, DragPreviewImage} from 'react-dnd';
import {prepareBuildFocus} from '@utils/loaders';
import {addSection, linkVertex, unlinkVertex} from '@utils/actions';
import {modifyState} from '@utils/loaders';
import CardVertex from './CardVertex';
import NodeVertex from './NodeVertex';
import ConfigNodeVertex from './ConfigNodeVertex';
import ChildHandle from './ChildHandle';
import ParentHandle from './ParentHandle';
import {HotKeys} from 'react-hotkeys';
import {getAncestry} from '@utils/vertexHelpers';

export function PureVertex({
  state,
  onClick,
  cardActions,
  dropActions,
  type,
  id,
  name,
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
    item: {type: 'Vertex', id: id, name: name, parents: parents},
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [{highlighted}, drop] = useDrop({
    accept: ['Vertex', 'DepotItem'],
    drop: (item, monitor) => {
      if (item.type === 'Vertex' && item.parents.includes(id)) {
        dropActions.Unlink(id, item.id);
      } else if (item.type === 'DepotItem' && !monitor.didDrop()) {
        dropActions[item.type](id, item.id);
      } else if (item.type === 'Vertex') {
        dropActions[item.type](id, item.id);
      }
    },
    canDrop: (item, monitor) => {
      if (item.type === 'Vertex') {
        if (item.id === id) return false;
        if (item.parents.includes(id)) return true;
        if (item.parents.length !== 0) return false;
        return true;
      } else if (item.type === 'DepotItem') {
        const anc_sec = getAncestry(state, id)[1];
        return !anc_sec.includes(item.id);
      }
      return true;
    },
    collect: monitor => ({
      highlighted: monitor.canDrop(),
    }),
  });
  drag(drop(ref));

  const styleProps = {
    building: state.building === id,
    isDragging: isDragging,
    highlighted: highlighted,
    prepared: prepared.includes(id),
  };
  const components = {
    conf: ConfigNodeVertex,
    node: NodeVertex,
    card: CardVertex,
  };
  const CurrentComponent = components[type];
  const zIndex = type === 'card' ? 4 : 3;

  const deleteNode = React.useCallback(() => {
    cardActions.onClear(id);
  }, [cardActions, id]);

  const handlers = {
    DELETE_NODE: deleteNode,
  };

  return (
    <div ref={ref} style={{zIndex: zIndex}} onMouseEnter={setFocus}>
      <HotKeys handlers={handlers}>
        <ParentHandle vertexId={id} />
        <DragPreviewImage src="img/icon-plus-20.png" connect={preview} />
        <div
          onClick={event => {
            event.stopPropagation();
            onClick(id);
          }}>
          <CurrentComponent
            name={name}
            cardActions={cardActions}
            sections={sections}
            id={id}
            state={state}
            styleProps={styleProps}
          />
        </div>
        <ChildHandle vertexId={id} />
      </HotKeys>
    </div>
  );
}

// ======== DnD Handling ========

export const removeAllSections = id => ({
  type: 'REMOVE_ALL_SECTIONS',
  vertex: id,
});

function actionDispatch(dispatch) {
  return {
    onClick: id => dispatch({type: 'MODIFY_STATE', update: {focus: id}}),
    cardActions: {
      onEditor: () => dispatch(modifyState({editor: 'vertex', editing: true})),
      onBuild: state => prepareBuildFocus(state, dispatch),
      onClear: id => dispatch(removeAllSections(id)),
    },
    dropActions: {
      Vertex: (to, from) => dispatch(linkVertex(to, from)),
      DepotItem: (to, from) => dispatch(addSection(to, from)),
      Unlink: (to, from) => dispatch(unlinkVertex(to, from)),
    },
  };
}

export default connect(state => ({state: state}), actionDispatch)(PureVertex);
