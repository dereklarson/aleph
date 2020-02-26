// @format
import React from 'react';
import {connect} from 'react-redux';
import {Button, TextField, Dialog} from '@material-ui/core';
import {DialogActions, DialogTitle, DialogContent} from '@material-ui/core';
import AceEditor from 'react-ace';
import _ from 'lodash';
import {modify} from '@data/reducers';
import {useStyles} from '@style/classes';
import {notEditingState} from '@utils/state';

import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';

export function PureTextEntry({open, context, dispatch}) {
  const {schema, edittext, editfunc} = context;
  const title = _.get(schema, 'title', 'TextEntry');
  const editor = _.get(schema, 'editor', false);
  const classes = useStyles();
  const [fieldText, setFieldText] = React.useState({});

  // We create a set of text fields based on the supplied schema
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

  // If the schema asks for an editor, we supply this last
  let aceText = edittext;
  if (editor) {
    itemDisplay.push(
      <AceEditor
        key="codeEdit"
        className={classes.editor}
        mode={_.get(schema, 'mode', 'yaml')}
        theme="monokai"
        defaultValue={edittext}
        onChange={(value, event) => {
          aceText = value;
        }}
      />,
    );
  }

  const onCancel = () => dispatch(modify('context', {...notEditingState}));
  const onDone = () => {
    dispatch(editfunc({fieldText, aceText}));
    dispatch(modify('context', {...notEditingState}));
  };

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
      {!schema.log && ( // For logging output, don't show action buttons
        <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={onDone}>Save</Button>
        </DialogActions>
      )}
    </Dialog>
  );
}

export default connect(state => ({context: state.context}))(PureTextEntry);
