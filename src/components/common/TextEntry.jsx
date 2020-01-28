// @format
import React from 'react';
import {connect} from 'react-redux';
import {Button, TextField, Dialog} from '@material-ui/core';
import {DialogActions, DialogTitle, DialogContent} from '@material-ui/core';
import AceEditor from 'react-ace';
import _ from 'lodash';
import {modify} from '@utils/loaders';
import {useStyles} from '@style/styling';

import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-monokai';

export function PureTextEntry({open, schema, func, dispatch}) {
  const classes = useStyles();

  let fieldText = {};
  const onEditorChange = (value, event) => {
    fieldText = value;
  };

  let itemDisplay = [];
  for (const keystr of Object.keys(_.get(schema, 'keys', []))) {
    let defProps = {};
    // Autofocus on our first text entry field
    if (itemDisplay.length === 0) defProps['autoFocus'] = true;
    itemDisplay.push(
      <TextField
        {...defProps}
        key={itemDisplay.length}
        className={classes.textField}
        variant="outlined"
        label={keystr}
        onChange={event => {
          fieldText[keystr] = event.target.value;
        }}
      />,
    );
  }

  let callfunc = func;
  if (_.has(schema, 'godmode')) {
    callfunc = text => modify('context', JSON.parse(text));
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

  const onCancel = () => dispatch(modify('context', {texting: false}));
  const onDone = () => {
    dispatch(modify('context', {texting: false}));
    console.log(callfunc(fieldText));
    if (_.get(schema, 'dispatch', true)) dispatch(callfunc(fieldText));
    else callfunc(fieldText);
  };

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle id="form-dialog-title">{schema.title}</DialogTitle>
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

export default connect(state => ({
  schema: state.context.schema,
  func: state.context.func,
}))(PureTextEntry);
