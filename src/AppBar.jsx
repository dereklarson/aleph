// @format
import React from 'react';
import {connect} from 'react-redux';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import {saveCheckpoint, loadCheckpoint, modifyState} from './utils/loaders';
import {generateButtons} from './utils//generateList';
import {playTutorial} from './utils/tutorial';
import {useStyles} from './style/styling';
import {capitalizeFirstLetter} from './utils/helpers';

export function PureAppBar({state, onLoad, onPlayTutorial, onSetState}) {
  const classes = useStyles();
  const [saved, setSaved] = React.useState(false);
  const onSave = () => {
    setSaved(true);
    saveCheckpoint('user', state);
  };

  const appBarOptions = [
    ['save_checkpoint', onSave],
    ['load_checkpoint', onLoad, saved],
    ['play_tutorial', () => onPlayTutorial(state)],
    ['set_state', () => onSetState()],
  ];

  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}>
          Control Center - {capitalizeFirstLetter(state.location)}
        </Typography>
        {generateButtons(appBarOptions)}
      </Toolbar>
    </AppBar>
  );
}

export default connect(
  state => ({state: state}),
  dispatch => ({
    onLoad: () => loadCheckpoint('user', dispatch),
    onPlayTutorial: state => playTutorial('tutorial', state, false, dispatch),
    onSetState: () => dispatch(modifyState({dagre: true})),
  }),
)(PureAppBar);
