// @format
import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import AceEditor from 'react-ace';
import Popup from 'reactjs-popup';
import {modifyState} from '../utils/loaders';

import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-monokai';

export function Editor({editor, text, open, onClose}) {
  var currtext = text;
  const onChange = (value, event) => {
    currtext = value;
  };
  const closeModal = () => onClose(currtext, editor);
  return (
    <Popup open={open} closeOnDocumentClick onClose={closeModal}>
      <div className="modal">
        <AceEditor
          width="100%"
          mode="yaml"
          theme="monokai"
          defaultValue={text}
          onChange={onChange}
        />
      </div>
    </Popup>
  );
}

const setNodeFulltext = (text, editor) => ({
  type: 'SET_TEXT',
  editor: editor,
  text: text,
});

function actionDispatch(dispatch) {
  return {
    onClose: (text, editor) => {
      dispatch(setNodeFulltext(text, editor));
      dispatch(modifyState({editor: null, editing: false}));
    },
  };
}

export default connect(
  state => ({
    editor: state.editor,
    text:
      state.editor === 'vertex'
        ? state[`${state.location}_fulltext`][state.focus]
        : _.get(state[`${state.location}_library`], state.editor, {text: ''})
            .text,
  }),
  actionDispatch,
)(Editor);
