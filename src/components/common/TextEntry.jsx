// @format
import React from 'react';
import {connect} from 'react-redux';
import {Button, TextField, Dialog} from '@material-ui/core';
import {DialogActions, DialogTitle, DialogContent} from '@material-ui/core';
import AceEditor from 'react-ace';
import _ from 'lodash';
import {modify} from '@data/reducers';
import {useStyles} from '@style/styling';
import {notTextingState} from '@utils/state';
import {saveDiagram} from '@ops/load';

import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-monokai';

export function PureTextEntry({open, location, schema, editfunc, dispatch}) {
  const classes = useStyles();
  let [fieldText, setFieldText] = React.useState({});

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

  let callfunc = editfunc;
  if (_.has(schema, 'godmode')) {
    callfunc = text => modify('context', JSON.parse(text));
    itemDisplay.push(
      <AceEditor
        className={classes.editor}
        mode="yaml"
        theme="monokai"
        defaultValue='{"dagre": true}'
        onChange={(value, event) => {
          fieldText = value;
        }}
      />,
    );
  }

  const onCancel = () => dispatch(modify('context', {...notTextingState}));
  const onDone = () => {
    if (_.has(fieldText, 'savename')) {
      console.log('Triggering save');
      dispatch(saveDiagram(location, fieldText.savename));
    } else {
      dispatch(callfunc(fieldText));
    }
    dispatch(modify('context', {...notTextingState}));
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
  location: state.context.location,
  schema: state.context.schema,
  editfunc: state.context.editfunc,
}))(PureTextEntry);
