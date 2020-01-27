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
import {useStyles} from 'style/styling';
import {themePicker} from 'style/theme';

export function PureInterface({themeStr, editing, texting}) {
  const classes = useStyles();

  const theme = themePicker[themeStr];

  return (
    <ThemeProvider theme={theme}>
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
  themeStr: state.theme,
  editing: state.editing,
  texting: state.texting,
}))(PureInterface);
