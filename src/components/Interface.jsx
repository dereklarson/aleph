// @format
import React from 'react';
import {connect} from 'react-redux';
import {CssBaseline} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/core/styles';
import AppBar from './AppBar';
import Workspace from '@comp/Workspace';
import Sidebar from '@sidebar/Sidebar';
import Editor from '@common/Editor';
import TextEntry from '@common/TextEntry';
import {GlobalHotKeys} from 'react-hotkeys';
import {useStyles} from '@style/styling';
import {themePicker} from '@style/theme';
import {ActionCreators as UndoAC} from 'redux-undo';

export function PureInterface({themeStr, editing, texting, dispatch}) {
  const classes = useStyles();

  const theme = themePicker[themeStr];

  const globalKeyMap = {
    UNDO: ['command+z'],
    REDO: ['command+shift+z'],
  };

  const globalHandlers = {
    UNDO: event => {
      console.log('Undoing...');
      dispatch(UndoAC.undo());
    },
    REDO: event => {
      console.log('Redoing...');
      dispatch(UndoAC.redo());
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalHotKeys keyMap={globalKeyMap} handlers={globalHandlers} />
      <div className={classes.root}>
        <CssBaseline />
        <Editor open={editing} />
        <TextEntry open={texting} />
        <AppBar />
        <Sidebar />
        <Workspace />
      </div>
    </ThemeProvider>
  );
}

export default connect(state => ({
  themeStr: state.context.theme,
  editing: state.context.editing,
  texting: state.context.texting,
}))(PureInterface);
