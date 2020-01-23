// @format
import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Button, TextField, Dialog} from '@material-ui/core';
import {DialogActions, DialogTitle, DialogContent} from '@material-ui/core';
import AceEditor from 'react-ace';
import {modifyState} from '../utils/loaders';
import {useStyles} from '../style/styling';

import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-monokai';

export function PureTextEntry({open, schema, func, godmode, shutModal}) {
  const classes = useStyles();

  let fieldText = {};
  let editorText;
  const onEditorChange = (value, event) => {
    fieldText = value;
  };

  let itemDisplay = [];
  for (const [key, value] of Object.entries(schema)) {
    if (key === 'godmode') continue;
    let defProps = {};
    // Autofocus on our first text entry field
    if (itemDisplay.length === 0) defProps['autoFocus'] = true;
    itemDisplay.push(
      <TextField
        {...defProps}
        className={classes.textField}
        variant="outlined"
        label={key}
        onChange={event => {
          fieldText[key] = event.target.value;
        }}
      />,
    );
  }

  let callfunc = func;
  if (_.has(schema, 'godmode')) {
    callfunc = godmode;
    itemDisplay.push(
      <AceEditor
        className={classes.editor}
        mode="yaml"
        theme="monokai"
        defaultValue="Arbitrary field setting"
        onChange={onEditorChange}
      />,
    );
  }

  const onCancel = () => shutModal();

  const onDone = () => {
    shutModal();
    callfunc(fieldText);
  };

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle id="form-dialog-title">Saving Diagram</DialogTitle>
      <DialogContent>{itemDisplay}</DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={onDone} color="primary">
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function actionDispatch(dispatch) {
  return {
    shutModal: (text, editor) => {
      dispatch(modifyState({texting: false}));
    },
    godmode: text => {
      dispatch(modifyState(JSON.parse(text)));
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
