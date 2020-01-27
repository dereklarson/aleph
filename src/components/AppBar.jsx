// @format
import React from 'react';
import {connect} from 'react-redux';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import {saveCheckpoint, loadCheckpoint, modifyState} from 'utils/loaders';
import {loadInputs, loadOrg} from 'utils/loaders';
import {generateButtons} from 'utils/generateList';
import {playTutorial} from 'utils/tutorial';
import {useStyles} from 'style/styling';
import {capitalizeFirstLetter} from 'utils/helpers';
import {requestOrg, godMode} from 'utils/stateHelpers';

export function PureAppBar({
  state,
  onLoadInputs,
  onLoadChk,
  onLoadOrg,
  onPlayTutorial,
  onText,
  onGodMode,
}) {
  const classes = useStyles();
  const onInitialLoad = () => onLoadInputs(state);

  // Performs loads on mount
  React.useEffect(onInitialLoad, [onLoadOrg]);

  const [saved, setSaved] = React.useState(false);
  const onSaveChk = () => {
    setSaved(true);
    saveCheckpoint('user', state);
  };
  const savefunc = fieldText => modifyState({organization: fieldText});

  const appBarOptions = [
    ['set_org', () => onText(savefunc)],
    ['load_org', () => onLoadOrg(state.organization)],
    ['save_checkpoint', onSaveChk],
    ['load_checkpoint', onLoadChk, saved],
    ['play_tutorial', () => onPlayTutorial(state)],
    ['god_mode', () => onGodMode()],
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
          {state.organization.name} - {capitalizeFirstLetter(state.location)}
        </Typography>
        {generateButtons(appBarOptions)}
      </Toolbar>
    </AppBar>
  );
}

export default connect(
  state => ({state: state}),
  dispatch => ({
    onLoadInputs: state => dispatch(loadInputs(state)),
    onLoadChk: () => loadCheckpoint('user', dispatch),
    onLoadOrg: org => dispatch(loadOrg(org)),
    onPlayTutorial: state => playTutorial('tutorial', state, false, dispatch),
    onText: savefunc => dispatch(modifyState({...requestOrg, func: savefunc})),
    onGodMode: () => dispatch(modifyState({...godMode})),
  }),
)(PureAppBar);
