// @format
import React from 'react';
import {connect} from 'react-redux';
import Popup from 'reactjs-popup';
import {List, ListSubheader, TextField} from '@material-ui/core';
import {clearDiagram, build, modifyState, saveDiagram} from '../utils/loaders';
import {loadRepo, loadSaved, loadDockerLibrary} from '../utils/loaders';
import {generateList} from '../utils/generateList';
import {noBuildState} from '../utils/stateReference';

import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-monokai';

function BulkActions({
  clear,
  onBuild,
  onClearBuild,
  onLoadLibrary,
  onLoadRepo,
  onLoadSaved,
  state,
  setMenuOpen,
}) {
  const [saveopen, openSave] = React.useState(false);
  const [savename, setSave] = React.useState('default');
  const cancel = React.useRef(false);

  const onLoadAll = () => {
    onLoadSaved();
    onLoadLibrary();
    onLoadRepo();
  };

  const onCancel = () => {
    if (state.building !== null) cancel.current = true;
    else onClearBuild();
  };

  const onSave = () => {
    openSave(false);
    saveDiagram(savename, {
      [`${state.location}_vertices`]: state[`${state.location}_vertices`],
      [`${state.location}_fulltext`]: state[`${state.location}_fulltext`],
    });
  };

  const actionOptions = [
    ['clear_diagram', () => clear(state.location)],
    ['build_marked', () => onBuild(state, cancel)],
    ['cancel_build', onCancel],
    ['refresh', onLoadAll],
    ['save_diagram', () => openSave(true)],
  ];

  // Performs loads on mount
  React.useEffect(onLoadAll, []);

  return (
    <List>
      <ListSubheader inset>Actions</ListSubheader>
      {generateList(actionOptions)}
      <Popup open={saveopen} onClose={onSave}>
        <div className="modal">
          <TextField
            label="Save name"
            defaultValue={savename}
            onChange={event => setSave(event.target.value)}
          />
        </div>
      </Popup>
    </List>
  );
}

function actionDispatch(dispatch) {
  return {
    clear: location => dispatch(clearDiagram(location)),
    onBuild: (state, cancel) => build(state, cancel, dispatch),
    onClearBuild: () => dispatch(modifyState(noBuildState)),
    onLoadLibrary: () => dispatch(loadDockerLibrary()),
    onLoadSaved: () => dispatch(loadSaved()),
    onLoadRepo: () => dispatch(loadRepo()),
  };
}

export default connect(
  state => ({state: state}),
  actionDispatch,
)(BulkActions);
