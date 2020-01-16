// @format
import React from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import AceEditor from 'react-ace';
import Popup from 'reactjs-popup';
import {modifyState} from '../utils/loaders';

import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-monokai';

// Possible this could be simplified with better JSX and state hooks
// export function NewEditor({open, setOpen, onClose}) {
export function NewEditor({fulltext, open, onClose}) {
  var currtext = fulltext; 
  const onChange = (value, event) => {
    currtext = value;
  };
  const closeModal = () => onClose(currtext);
  return (
    <Popup open={open} closeOnDocumentClick onClose={closeModal}>
      <div className="modal">
        <AceEditor
          width="100%"
          mode="yaml"
          theme="monokai"
          defaultValue={fulltext}
          onChange={onChange}
        />
      </div>
    </Popup>
  );
}

const setNodeFulltext = text => ({
  type: 'SET_NODE_FULLTEXT',
  text: text,
});

function actionDispatch(dispatch) {
  return {
    onClose: text => {
      dispatch(setNodeFulltext(text));
      dispatch(modifyState({editor: false}));
    }
  };
}

export default connect(
  state => ({fulltext: state[`${state.location}_fulltext`][state.focus]}),
  actionDispatch,
)(NewEditor);
