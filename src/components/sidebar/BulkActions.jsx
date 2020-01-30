// @format
import React from 'react';
import {connect} from 'react-redux';
import {List, ListSubheader} from '@material-ui/core';
import {blankOperations} from '@data/reference';
import {modify} from '@data/reducers';
import {loadCore} from '@ops/load';
import {buildDocker} from '@ops/build';
import {generateList} from '@utils/generateList';
import {requestSave} from '@utils/state';

import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-monokai';

function BulkActions({
  onClear,
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

  const actionOptions = [
    ['clear_diagram', () => onClear(location)],
    ['build_marked', () => onBuild(operations, cancel)],
    ['cancel_build', onCancel],
    ['refresh', () => onLoadSaved(location)],
    ['save_diagram', () => onText()],
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
    onClear: location => dispatch(modify('vertices', {[location]: {}})),
    onBuild: (operations, cancel) => dispatch(buildDocker(operations, cancel)),
    onClearBuild: () => dispatch(modify('operations', blankOperations)),
    onLoadSaved: location => dispatch(loadCore('diagrams', location)),
    onText: () => dispatch(modify('context', {...requestSave})),
  };
}

export default connect(
  state => ({operations: state.operations, location: state.context.location}),
  actionDispatch,
)(BulkActions);
