// @format
import React from 'react';
import {connect} from 'react-redux';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
// import _ from 'lodash';
import {modify} from '@data/reducers';
import {loadInputs, saveCheckpoint, loadCheckpoint} from '@ops/load';
import {generateList} from '@utils/generateList';
import {playTutorial} from '@utils/tutorial';
import {godMode} from '@utils/state';
import {titlize} from '@utils/helpers';
import {useStyles} from '@style/styling';

export function PureAppBar({config, context, dispatch}) {
  const classes = useStyles();
  const onInitialLoad = () => {
    dispatch(loadInputs(config));
  };

  // Performs loads on mount
  React.useEffect(onInitialLoad, []);

  const [saved, setSaved] = React.useState(false);
  const onSaveCheckpoint = () => {
    setSaved(true);
    dispatch(saveCheckpoint('user'));
  };

  const nextTheme = context.theme === 'light' ? 'dark' : 'light';
  const appBarOptions = [
    ['set_theme', () => dispatch(modify('context', {theme: nextTheme}))],
    ['save_checkpoint', onSaveCheckpoint],
    ['load_checkpoint', () => dispatch(loadCheckpoint('user')), saved],
    ['play_tutorial', () => playTutorial('tutorial')],
    ['god_mode', () => dispatch(modify('context', {...godMode}))],
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
          {config.organization.name} - {titlize(context.location)}
        </Typography>
        {generateList('button', appBarOptions)}
      </Toolbar>
    </AppBar>
  );
}

export default connect(state => ({
  config: state.config,
  context: state.context,
}))(PureAppBar);
