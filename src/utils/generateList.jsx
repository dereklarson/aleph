// @format
import React from 'react';
import {ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {ListItemAvatar, ListItemSecondaryAction} from '@material-ui/core';
import {Fab, IconButton, Avatar} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import _ from 'lodash';
import {iconSource} from '@style/icons';
import {applyTooltip} from '@style/tooltips';
import {titlize} from './helpers';
import {useStyles} from '@style/styling';

function ListItemGen({name, onClick, defIcon}) {
  return (
    <ListItem button onClick={onClick}>
      <ListItemIcon>
        {_.get(iconSource, name, _.get(iconSource, defIcon))}
      </ListItemIcon>
      <ListItemText primary={titlize(name)} />
    </ListItem>
  );
}

function StyledAvatar({item}) {
  const classes = useStyles();
  return <Avatar className={classes.avatar}>{item}</Avatar>;
}

function ListWithDeleteIcon({name, onClick, defIcon}) {
  let item = _.get(iconSource, name, _.get(iconSource, defIcon));
  return (
    <ListItem button onClick={onClick}>
      <ListItemAvatar>
        <StyledAvatar item={item} />
      </ListItemAvatar>
      <ListItemText primary={titlize(name)} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

function IconButtonGen({name, onClick, defIcon}) {
  return (
    <IconButton color="inherit" onClick={onClick}>
      {_.get(iconSource, name, _.get(iconSource, defIcon))}
    </IconButton>
  );
}

function AutoFab({name, onClick, defIcon}) {
  return (
    <Fab size="small" onClick={onClick}>
      {_.get(iconSource, name, _.get(iconSource, defIcon))}
    </Fab>
  );
}

const kinds = {
  list: ListItemGen,
  listDel: ListWithDeleteIcon,
  button: IconButtonGen,
  fab: AutoFab,
};

export function generateList(kind, options, listIcon = 'def', ttBase = '') {
  let itemDisplay = [];
  options.forEach(function(config, index) {
    const props = {name: config[0], onClick: config[1], defIcon: listIcon};
    itemDisplay.push(
      <div key={index}>
        {applyTooltip(kinds[kind](props), config[0], ttBase)}
      </div>,
    );
  });
  return itemDisplay;
}
