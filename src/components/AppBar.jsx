// @format
import React from 'react';
import {connect} from 'react-redux';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import _ from 'lodash';
import {saveCheckpoint, loadCheckpoint, modify} from '@utils/loaders';
import {loadInputs, loadOrg} from '@utils/loaders';
import {generateButtons} from '@utils/generateList';
import {playTutorial} from '@utils/tutorial';
import {useStyles} from '@style/styling';
import {capitalizeFirstLetter} from '@utils/helpers';
import {requestOrg, godMode} from '@utils/stateHelpers';

export function PureAppBar({
  config,
  context,
  onLoadInputs,
  onLoadChk,
  onLoadOrg,
  onPlayTutorial,
  onSetTheme,
  onText,
  onGodMode,
  loc,
}) {
  const classes = useStyles();
  const onInitialLoad = () => onLoadInputs(config);

  // Performs loads on mount
  React.useEffect(onInitialLoad, [onLoadOrg]);

  const [saved, setSaved] = React.useState(false);
  // const onSaveChk = () => {
  //   setSaved(true);
  //   saveCheckpoint('user', state);
  // };
  const savefunc = fieldText => ({
    type: 'MODIFY_CONFIG',
    update: {organization: fieldText},
  });

  const appBarOptions = [
    ['set_org', () => onText(savefunc)],
    ['load_org', () => onLoadOrg(config.organization)],
    [
      'set_theme',
      () => onSetTheme(context.theme === 'light' ? 'dark' : 'light'),
    ],
    // ['save_checkpoint', onSaveChk],
    ['load_checkpoint', onLoadChk, saved],
    // ['play_tutorial', () => onPlayTutorial(state)],
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
          {config.organization.name} - {capitalizeFirstLetter(context.location)}
        </Typography>
        {generateButtons(appBarOptions)}
      </Toolbar>
    </AppBar>
  );
}

export default connect(
  state => ({config: state.config.present, context: state.context}),
  dispatch => ({
    onLoadInputs: state => dispatch(loadInputs(state)),
    onLoadChk: () => loadCheckpoint('user', dispatch),
    onLoadOrg: org => dispatch(loadOrg(org)),
    onPlayTutorial: state => playTutorial('tutorial', state, false, dispatch),
    onSetTheme: theme => dispatch(modify('context', {theme: theme})),
    onText: savefunc =>
      dispatch(modify('context', {...requestOrg, func: savefunc})),
    onGodMode: () => dispatch(modify('context', {...godMode})),
  }),
)(PureAppBar);
