// @format
import React from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import AceEditor from 'react-ace';
import Popup from 'reactjs-popup';

import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-monokai';

// Possible this could be simplified with better JSX and state hooks
class PopupEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  openModal = () => {
    this.setState({...this.state, open: true});
  };
  closeModal = () => {
    this.props.onCloseModal(this.props.fulltext);
    this.setState({...this.state, open: false});
  };
  onChange = (value, event) => {
    this.props.fulltext = value;
  };

  render() {
    return (
      <div>
        <Button onClick={this.openModal}>Editor</Button>
        <Popup
          open={this.state.open}
          closeOnDocumentClick
          onClose={this.closeModal}>
          <div className="modal">
            <AceEditor
              width="100%"
              mode="yaml"
              theme="monokai"
              defaultValue={this.props.fulltext}
              onChange={this.onChange}
            />
          </div>
        </Popup>
      </div>
    );
  }
}

const setNodeFulltext = text => ({
  type: 'SET_NODE_FULLTEXT',
  text: text,
});

function actionDispatch(dispatch) {
  return {
    onCloseModal: text => dispatch(setNodeFulltext(text)),
  };
}

export default connect(
  state => ({fulltext: state[`${state.location}_fulltext`][state.focus]}),
  actionDispatch,
)(PopupEditor);
