// @format
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import clsx from 'clsx';
import _ from 'lodash';
import {useStyles} from '@style/classes';

function genTTList(text, isOver) {
  let count = isOver ? 5 : 1;
  let lines = text.split('\n').slice(0, count);
  let itemDisplay = [];
  lines.forEach((line, index) => {
    itemDisplay.push(
      <ListItem key={index}>
        <ListItemText primary={line} />
      </ListItem>,
    );
  });
  return <List dense={true}> {itemDisplay} </List>;
}

export default function TestWrapper({uid, contextProps, env, children}) {
  const classes = useStyles();
  let ttText = _.get(env.test_output, uid, '');
  let ttOpen = env.testing && ttText.length > 0;
  let ttDiv = genTTList(ttText, contextProps.isOver);

  return (
    <Tooltip
      classes={{
        tooltip: clsx(
          classes.oofTooltip,
          contextProps.isOver && classes.testTooltip,
        ),
      }}
      arrow
      placement="right-start"
      open={ttOpen}
      title={ttDiv}>
      {children}
    </Tooltip>
  );
}
