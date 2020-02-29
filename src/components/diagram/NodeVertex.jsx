// @format
import React from 'react';
import {connect} from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import clsx from 'clsx';
import _ from 'lodash';
import {propsToStyle} from '@utils/helpers';
import {useStyles} from '@style/classes';
import {iconSource} from '@style/icons';

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

export function PureNodeVertex({uid, libAssn, styleProps, ops}) {
  const classes = useStyles();
  let ttText = _.get(ops.test_output, uid, '');
  let ttOpen = ops.testing && ttText.length > 0;
  let ttDiv = genTTList(ttText, styleProps.isOver);
  const defIcon = _.get(iconSource, 'node');
  return (
    <Tooltip
      classes={{
        tooltip: clsx(
          classes.oofTooltip,
          styleProps.isOver && classes.testTooltip,
        ),
      }}
      arrow
      placement="right-start"
      open={ttOpen}
      title={ttDiv}>
      <Badge
        color="primary"
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        className={classes.badge}
        badgeContent={libAssn.length}>
        <Fab
          variant="extended"
          style={propsToStyle({...styleProps, testing: ops.testing})}>
          {_.get(iconSource, libAssn[0] || '', defIcon)} {uid}
        </Fab>
      </Badge>
    </Tooltip>
  );
}

export default connect(state => ({ops: state.operations}))(PureNodeVertex);
