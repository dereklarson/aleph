// @format
import React from 'react';
import {connect} from 'react-redux';
import AceEditor from 'react-ace';
import Popup from 'reactjs-popup';
// import _ from 'lodash';
import {modify} from '@data/reducers';
import {notEditingState} from '@utils/state';

import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-monokai';

export function Editor({open, edittext, editfunc, dispatch}) {
  let currText = edittext;
  const closeModal = () => {
    dispatch(editfunc(currText));
    dispatch(modify('context', {...notEditingState}));
  };
  return (
    <Popup open={open} closeOnDocumentClick onClose={closeModal}>
      <div className="modal">
        <AceEditor
          width="100%"
          mode="yaml"
          theme="monokai"
          defaultValue={edittext}
          onChange={(value, event) => {
            currText = value;
          }}
        />
      </div>
    </Popup>
  );
}

export default connect(state => ({
  edittext: state.context.edittext,
  editfunc: state.context.editfunc,
}))(Editor);
