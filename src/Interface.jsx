// @format
import React from 'react';
import {connect} from 'react-redux';
import {CssBaseline} from '@material-ui/core';
import AppBar from './AppBar';
import Workspace from './Workspace';
import Sidebar from './sidebar/Sidebar';
import Editor from './comcom/Editor';
import TextEntry from './comcom/TextEntry';
import {useStyles} from './style/styling';

export function Interface({editing, texting}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Editor open={editing} />
      <TextEntry open={texting} />
      <AppBar />
      <Sidebar />
      <Workspace />
    </div>
  );
}

export default connect(state => ({
  editing: state.editing,
  texting: state.texting,
}))(Interface);
