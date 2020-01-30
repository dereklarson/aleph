// @format
import React from 'react';
import {connect} from 'react-redux';
import {List, ListSubheader} from '@material-ui/core';
import {build, saveDiagram} from '@utils/loaders';
import {loadCore} from '@utils/loaders';
import {generateList} from '@utils/generateList';
import {blankOperations} from '@utils/stateReference';
import {requestSave} from '@utils/stateHelpers';
import {modify} from '@utils/reducers';

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

  const savefunc = fieldText => {
    saveDiagram(location, fieldText.savename);
  };

  const actionOptions = [
    ['clear_diagram', () => onClear(location)],
    ['build_marked', () => onBuild(operations, cancel)],
    ['cancel_build', onCancel],
    ['refresh', () => onLoadSaved(location)],
    ['save_diagram', () => onText(savefunc)],
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
    onBuild: (operations, cancel) => dispatch(build(operations, cancel)),
    onClearBuild: () => dispatch(modify('operations', blankOperations)),
    onLoadSaved: location => dispatch(loadCore('diagrams', location)),
    onText: savefunc =>
      dispatch(modify('context', {...requestSave, editfunc: savefunc})),
  };
}

export default connect(
  state => ({operations: state.operations, location: state.context.location}),
  actionDispatch,
)(BulkActions);
