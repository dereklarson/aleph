// @format
import React from 'react';
import {ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {Fab, IconButton} from '@material-ui/core';
import _ from 'lodash';
import {iconSource} from '@style/icons';
import {applyTooltip} from '@style/tooltips';
import {titlize} from './helpers';

function listItem(name, onClick, defIcon) {
  return (
    <ListItem button onClick={onClick}>
      <ListItemIcon>
        {_.get(iconSource, name, _.get(iconSource, defIcon))}
      </ListItemIcon>
      <ListItemText primary={titlize(name)} />
    </ListItem>
  );
}

function iconButton(name, onClick, defIcon) {
  return (
    <IconButton color="inherit" onClick={onClick}>
      {_.get(iconSource, name, _.get(iconSource, defIcon))}
    </IconButton>
  );
}

function autoFab(name, onClick, defIcon) {
  return (
    <Fab size="small" onClick={onClick}>
      {_.get(iconSource, name, _.get(iconSource, defIcon))}
    </Fab>
  );
}

const kinds = {
  list: listItem,
  button: iconButton,
  fab: autoFab,
};

export function generateList(kind, options, listIcon = 'def', ttBase = '') {
  let itemDisplay = [];
  options.forEach(function(config, index) {
    itemDisplay.push(
      <div key={index}>
        {applyTooltip(
          kinds[kind](config[0], config[1], listIcon),
          config[0],
          ttBase,
        )}
      </div>,
    );
  });
  return itemDisplay;
}
