// @format
import React from 'react';
import {connect} from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import Fab from '@material-ui/core/Fab';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import _ from 'lodash';
import {propsToStyle} from '@utils/helpers';
import {useStyles} from '@style/styling';

export function PureNodeVertex({uid, sections, styleProps, output}) {
  const classes = useStyles();
  const icon = <DonutSmallIcon style={{padding: 3}} />;
  let ttText = _.get(output, uid, '');
  let ttDiv = ttText ? <div style={{fontSize: '14px'}}>{ttText}</div> : '';
  let ttOpen = ttText ? true : false;
  return (
    <Tooltip arrow placement="right-end" open={ttOpen} title={ttDiv}>
      <Badge
        color="primary"
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        className={classes.badge}
        badgeContent={sections.length}>
        <Fab variant="extended" style={propsToStyle(styleProps)}>
          {icon} {uid}
        </Fab>
      </Badge>
    </Tooltip>
  );
}

export default connect(state => ({
  output: state.operations.test_output,
}))(PureNodeVertex);
