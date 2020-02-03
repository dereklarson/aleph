// @format
import React from 'react';
import {Tooltip} from '@material-ui/core';
import _ from 'lodash';

const tooltipReference = {
  save_checkpoint: 'Checkpoint the current state',
  load_checkpoint: 'Load the state checkpoint',
  play_tutorial: 'This plays the current sample tutorial',
  god_mode: 'Cheat mode:  directly set state via text',
  clear_diagram: 'This will clear the current diagram, deleting all vertices',
  build_marked: 'Build the diagram, current build items will be colored green',
  refresh: 'Reload the Depot and Saved Configurations',
  show_logs: 'Show the most recent stdout from build logs',
  save_diagram: 'Save the current diagram to yaml',
};

export function applyTooltip(child, key = null, title = 'no tooltip') {
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
