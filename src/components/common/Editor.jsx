// @format
import React from 'react';
import {connect} from 'react-redux';
import AceEditor from 'react-ace';
import Popup from 'reactjs-popup';
import _ from 'lodash';
import {modify} from '@utils/loaders';

import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-monokai';

export function Editor({location, editor, text, open, onClose}) {
  let currtext = text;
  const onChange = (value, event) => {
    currtext = value;
  };
  const closeModal = () => onClose(location, editor, currtext);
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

const setNodeFulltext = (location, editor, text) => ({
  type: 'WRITE_TEXT',
  location: location,
  editor: editor,
  text: text,
});

function actionDispatch(dispatch) {
  return {
    onClose: (location, editor, text) => {
      dispatch(setNodeFulltext(location, editor, text));
      dispatch(modify('context', {editor: null, editing: false}));
    },
  };
}

export default connect(
  state => ({
    location: state.context.location,
    editor: state.context.editor,
    text:
      state.context.editor === 'vertex'
        ? state.corpus[state.context.location][state.context.focus]
        : _.get(state.library[state.context.location], state.context.editor, {
            text: '',
          }).text,
  }),
  actionDispatch,
)(Editor);
