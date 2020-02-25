// @format
import React from 'react';
import {connect} from 'react-redux';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
// import _ from 'lodash';
import {modify} from '@data/reducers';
import {loadInputs, saveCheckpoint, loadCheckpoint} from '@ops/load';
import {generateList} from '@utils/generateList';
import {playTutorial} from '@utils/tutorial';
import {titlize} from '@utils/helpers';
import {useStyles} from '@style/styling';

export function PureAppBar({config, context, dispatch}) {
  const classes = useStyles();
  const onInitialLoad = () => {
    dispatch(loadInputs(config));
  };

  // Performs loads on mount
  React.useEffect(onInitialLoad, []);

  const nextTheme = context.themeName === 'light' ? 'dark' : 'light';
  const appBarOptions = [
    ['set_theme', () => dispatch(modify('context', {themeName: nextTheme}))],
    ['save_checkpoint', () => dispatch(saveCheckpoint('user'))],
    ['load_checkpoint', () => dispatch(loadCheckpoint('user'))],
    ['play_tutorial', () => dispatch(playTutorial('tutorial'))],
  ];

  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.toolbar} variant="dense">
        <Typography className={classes.title} variant="h6">
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
