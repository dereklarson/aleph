// @format
import React from 'react';
import AceEditor from 'react-ace';
import Popup from 'reactjs-popup';

import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-monokai';

// Possible this could be simplified with better JSX and state hooks
function LogPopup({open, close, text}) {
  return (
    <div>
      <Popup open={open} closeOnDocumentClick onClose={close}>
        <div className="modal">
          <AceEditor
            width="100%"
            mode="yaml"
            theme="monokai"
            defaultValue={text}
          />
        </div>
      </Popup>
    </div>
  );
}

export default LogPopup;
