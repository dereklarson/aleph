// @format
import React from 'react';
import {ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {IconButton, Tooltip} from '@material-ui/core';
// import Tooltip from '@material-ui/core/Tooltip';
import _ from 'lodash';
import {iconSource} from '../style/icons';
import {titlize} from './helpers';

const tooltipReference = {
  save_checkpoint: 'Checkpoint the current state',
  load_checkpoint: 'Load the state checkpoint',
  play_tutorial: 'This plays the current sample tutorial',
  set_state: 'Cheat mode:  directly set state via text',
  clear_diagram: 'This will clear the current diagram, deleting all vertices',
  build_marked:
    'This will build the diagram, current build will be colored green',
  refresh: 'Reload the Depot and Saved Configurations',
  show_logs: 'Show the most recent stdout from build logs',
  save_diagram: 'Save the current diagram to yaml',
};

export function applyTooltip(child, title = 'no tooltip', key = null) {
  if (key !== null) {
    title = title.replace('<>', key);
    title = _.get(tooltipReference, key, title);
  }
  return (
    <Tooltip title={title} placement="bottom" enterDelay={500}>
      {child}
    </Tooltip>
  );
}

export function generateButtons(options, icon = 'def', tooltipBase = '') {
  let itemDisplay = [];
  for (const config of options) {
    itemDisplay.push(
      applyTooltip(
        <IconButton color="inherit" onClick={config[1]}>
          {_.get(iconSource, config[0], _.get(iconSource, icon))}
        </IconButton>,
        tooltipBase,
        config[0],
      ),
    );
  }
  return itemDisplay;
}

export function generateList(options, tooltipBase = '', icon = 'def') {
  let itemDisplay = [];
  for (const config of options) {
    itemDisplay.push(
      <ListItem button onClick={config[1]}>
        <ListItemIcon>
          {_.get(iconSource, config[0], _.get(iconSource, icon))}
        </ListItemIcon>
        {applyTooltip(
          <ListItemText primary={titlize(config[0])} />,
          tooltipBase,
          config[0],
        )}
      </ListItem>,
    );
  }
  return itemDisplay;
}
