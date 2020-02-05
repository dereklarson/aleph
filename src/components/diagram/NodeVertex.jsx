// @format
import React from 'react';
import {connect} from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import _ from 'lodash';
import {propsToStyle} from '@utils/helpers';
import {useStyles} from '@style/styling';

function genTTList(text) {
  let lines = text.split('\n').slice(0, 3);
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

export function PureNodeVertex({uid, sections, styleProps, ops}) {
  const classes = useStyles();
  const icon = <DonutSmallIcon style={{padding: 3}} />;
  let ttText = _.get(ops.test_output, uid, '');
  let ttDiv = genTTList(ttText);
  let ttOpen = ops.testing && ttText;
  return (
    <Tooltip
      classes={{tooltip: classes.testTooltip}}
      arrow
      placement="right-end"
      open={ttOpen}
      title={ttDiv}>
      <Badge
        color="primary"
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        className={classes.badge}
        badgeContent={sections.length}>
        <Fab
          variant="extended"
          style={propsToStyle({...styleProps, testing: ops.testing})}>
          {icon} {uid}
        </Fab>
      </Badge>
    </Tooltip>
  );
}

export default connect(state => ({ops: state.operations}))(PureNodeVertex);
