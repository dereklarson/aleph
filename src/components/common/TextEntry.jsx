// @format
import React from 'react';
import {connect} from 'react-redux';
import {Button, TextField, Dialog} from '@material-ui/core';
import {DialogActions, DialogTitle, DialogContent} from '@material-ui/core';
import AceEditor from 'react-ace';
import _ from 'lodash';
import {modify} from '@data/reducers';
import {useStyles} from '@style/styling';
import {notEditingState} from '@utils/state';

import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';

export function PureTextEntry({open, context, dispatch}) {
  const classes = useStyles();
  const {schema, edittext, editfunc} = context;
  const editor = _.get(schema, 'editor', false);
  const initTextState = editor ? {_editor: edittext} : {};
  const [fieldText, setFieldText] = React.useState(initTextState);

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
          setFieldText({...fieldText, [keystr]: event.target.value});
        }}
      />,
    );
  }
  if (editor) {
    itemDisplay.push(
      <AceEditor
        key="codeEdit"
        className={classes.editor}
        mode={_.get(schema, 'mode', 'yaml')}
        theme="monokai"
        defaultValue={edittext}
        onChange={(value, event) => {
          fieldText['_editor'] = value;
        }}
      />,
    );
  }

  const onCancel = () => dispatch(modify('context', {...notEditingState}));
  const onDone = () => {
    dispatch(editfunc(fieldText));
    dispatch(modify('context', {...notEditingState}));
    setFieldText({});
  };
  const title = _.get(schema, 'title', 'TextEntry');

  return (
    <Dialog
      maxWidth={'lg'}
      open={open}
      onClose={onCancel}
      onKeyPress={event => {
        if (!editor && event.key === 'Enter') onDone();
        if (event.shiftKey && event.key === 'Enter') onDone();
      }}>
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
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

export default connect(state => ({context: state.context}))(PureTextEntry);
