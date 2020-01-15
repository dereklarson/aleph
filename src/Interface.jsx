// @format
import React from 'react';
import {connect} from 'react-redux';
import {CssBaseline, Typography} from '@material-ui/core';
import {AppBar, Toolbar} from '@material-ui/core';
import Workspace from './Workspace';
import Sidebar from './sidebar/Sidebar';
import {generateButtons} from './utils//generateList';
import {Credits} from './comcom/Accessories';
import {saveCheckpoint, loadCheckpoint, modifyState} from './utils/loaders';
import {playTutorial} from './utils/tutorial';
import {iconSource} from './style/icons';
import {useStyles} from './style/styling';

export function Interface({state, onLoad, onPlayTutorial, onSetState}) {
  const classes = useStyles();
  const [saved, setSaved] = React.useState(false);

  const onSave = () => {
    setSaved(true);
    saveCheckpoint('user', state);
  };

  const appBarOptions = [
    ['save_checkpoint', onSave],
    ['load_checkpoint', onLoad],
    ['play_tutorial', () => onPlayTutorial(state)],
    ['set_state', () => onSetState()],
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}>
            Control Center
          </Typography>
          {generateButtons(appBarOptions)}
        </Toolbar>
      </AppBar>
      <Sidebar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Workspace />
        <Credits />
      </main>
    </div>
  );
}

export default connect(
  state => ({state: state}),
  dispatch => ({
    onLoad: () => loadCheckpoint('user', dispatch),
    onPlayTutorial: state => playTutorial('tutorial', state, false, dispatch),
    onSetState: () => dispatch(modifyState({dagre: true})),
  }),
)(Interface);
