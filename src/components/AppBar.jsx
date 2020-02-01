// @format
import React from 'react';
import {connect} from 'react-redux';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
// import _ from 'lodash';
import {useStyles} from '@style/styling';
import {modify} from '@data/reducers';
import {loadInputs, loadOrg} from '@ops/load';
import {pushOrg, pushImages} from '@ops/control';
import {saveCheckpoint, loadCheckpoint} from '@ops/load';
import {generateButtons} from '@utils/generateList';
import {playTutorial} from '@utils/tutorial';
import {capitalizeFirstLetter} from '@utils/helpers';
import {requestOrg, godMode} from '@utils/state';

export function PureAppBar({config, context, dispatch}) {
  const classes = useStyles();
  const onInitialLoad = () => {
    dispatch(loadInputs(config));
  };
  let organization = config.organization;

  // Performs loads on mount
  React.useEffect(onInitialLoad, []);

  const [saved, setSaved] = React.useState(false);
  const onSaveCheckpoint = () => {
    setSaved(true);
    dispatch(saveCheckpoint('user'));
  };
  const editfunc = fieldText => modify('config', {organization: fieldText});

  const nextTheme = context.theme === 'light' ? 'dark' : 'light';
  const appBarOptions = [
    ['set_org', () => dispatch(modify('context', {...requestOrg, editfunc}))],
    ['load_org', () => dispatch(loadOrg(organization))],
    ['push_org', () => dispatch(pushOrg())],
    ['push_images', () => dispatch(pushImages(organization, 'ubuntux'))],
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
          {organization.name} - {capitalizeFirstLetter(context.location)}
        </Typography>
        {generateButtons(appBarOptions)}
      </Toolbar>
    </AppBar>
  );
}

export default connect(state => ({
  config: state.config,
  context: state.context,
}))(PureAppBar);
