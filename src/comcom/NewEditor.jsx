// @format
import React from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import AceEditor from 'react-ace';
import Popup from 'reactjs-popup';

import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-monokai';

// Possible this could be simplified with better JSX and state hooks
export function NewEditor({open, setOpen, onClose}) {
  const onChange = (value, event) => {
    fulltext = value;
  };
  return (
    <Popup closeOnDocumentClick onClose={closeModal}>
      <div className="modal">
        <AceEditor
          width="100%"
          mode="yaml"
          theme="monokai"
          defaultValue="{dagre: true}"
          onChange={onChange}
        />
      </div>
    </Popup>
  );
}

export default connect(
  state => ({fulltext: state[`${state.location}_fulltext`][state.focus]}),
  actionDispatch,
)(NewEditor);
