// @format
import React from 'react';
import {connect} from 'react-redux';
import {List, ListSubheader} from '@material-ui/core';
import {clearDiagram, build, modify} from '@utils/loaders';
// import {clearDiagram, build, modifyState, saveDiagram} from '@utils/loaders';
import {loadCore} from '@utils/loaders';
import {generateList} from '@utils/generateList';
import {blankOperations} from '@utils/stateReference';
import {requestSave} from '@utils/stateHelpers';

import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-monokai';

function BulkActions({
  clear,
  onBuild,
  onClearBuild,
  onLoadSaved,
  onText,
  operations,
  location,
}) {
  const cancel = React.useRef(false);
  const onCancel = () => {
    if (operations.building !== null) cancel.current = true;
    else onClearBuild();
  };

  // const savefunc = fieldText => {
  //   saveDiagram(context.location, fieldText.savename, {
  //     [`${state.location}_vertices`]: state[`${state.location}_vertices`],
  //     [`${state.location}_fulltext`]: state[`${state.location}_fulltext`],
  //   });
  // };

  const actionOptions = [
    ['clear_diagram', () => clear(location)],
    ['build_marked', () => onBuild(operations, cancel)],
    ['cancel_build', onCancel],
    ['refresh', () => onLoadSaved(location)],
    // ['save_diagram', () => onText(savefunc)],
  ];

  return (
    <List>
      <ListSubheader inset>Actions</ListSubheader>
      {generateList(actionOptions)}
    </List>
  );
}

function actionDispatch(dispatch) {
  return {
    clear: location => dispatch(clearDiagram(location)),
    onBuild: (operations, cancel) => build(operations, cancel, dispatch),
    onClearBuild: () => dispatch(modify('operations', blankOperations)),
    onLoadSaved: location => dispatch(loadCore('diagrams', location)),
    onText: savefunc =>
      dispatch(modify('context', {...requestSave, func: savefunc})),
  };
}

export default connect(
  state => ({operations: state.operations, location: state.context.location}),
  actionDispatch,
)(BulkActions);
