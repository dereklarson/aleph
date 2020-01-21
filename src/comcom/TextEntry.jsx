// @format
import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {TextField} from '@material-ui/core';
import AceEditor from 'react-ace';
import Popup from 'reactjs-popup';
import {modifyState} from '../utils/loaders';
import {useStyles} from '../style/styling';

import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-monokai';

export function PureTextEntry({open, schema, func, shutModal}) {
  const classes = useStyles();

  let editorText;
  const onEditorChange = (value, event) => {
    editorText = value;
  };

  let fieldText = {};
  let itemDisplay = [];
  for (const [key, value] of Object.entries(schema)) {
    if (key === 'godmode') continue;
    itemDisplay.push(
      <TextField
        autoFocus
        label={key}
        className={classes.textField}
        variant="outlined"
        onChange={event => {
          fieldText[key] = event.target.value;
        }}
      />,
    );
  }

  if (_.has(schema, 'godmode')) {
    itemDisplay.push(
      <AceEditor
        width="100%"
        mode="yaml"
        theme="monokai"
        defaultValue="Arbitrary field setting"
        onChange={onEditorChange}
      />,
    );
  }

  const onClose = () => {
    shutModal();
    func(fieldText);
  };

  return (
    <Popup open={open} closeOnDocumentClick onClose={onClose}>
      <div className="modal">{itemDisplay}</div>
    </Popup>
  );
}

function actionDispatch(dispatch) {
  return {
    shutModal: (text, editor) => {
      dispatch(modifyState({texting: false}));
    },
  };
}

export default connect(
  state => ({
    open: state.texting,
    schema: state.entry_schema,
    func: state.func,
  }),
  actionDispatch,
)(PureTextEntry);
