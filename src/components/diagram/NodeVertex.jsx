// @format
import React from 'react';
import {connect} from 'react-redux';
import {Box, Badge} from '@material-ui/core';
import _ from 'lodash';
import {titlize, propsToStyle} from '@utils/helpers';
import {useStyles} from '@style/classes';
import {iconSource} from '@style/icons';
import TestWrapper from './TestWrapper';

export function PureNodeVertex({
  uid,
  styles,
  styleAssns,
  libAssns,
  styleProps,
  ops,
}) {
  const classes = useStyles();
  const defIcon = _.get(iconSource, 'node');
  const defStyle = JSON.parse(_.get(styles, 'node', {text: '{}'}).text);
  let customProps = defStyle;
  Object.assign(
    customProps,
    propsToStyle({...styleProps, testing: ops.testing}),
  );
  for (let style of styleAssns) {
    Object.assign(
      customProps,
      JSON.parse(_.get(styles, style, {text: '{}'}).text),
    );
  }

  return (
    <TestWrapper uid={uid} ops={ops} styleProps={styleProps}>
      <Badge
        color="primary"
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        className={classes.badge}
        badgeContent={libAssns.length}>
        <div style={{position: 'relative'}}>
          <Box key="shape" boxShadow="8" style={customProps} />
          <Box key="text" className={classes.nodeText}>
            {_.get(iconSource, libAssns[0] || '', defIcon)} {titlize(uid)}
          </Box>
        </div>
      </Badge>
    </TestWrapper>
  );
}

export default connect(state => ({
  ops: state.operations,
  styles: state.battery[state.context.location].styles,
}))(PureNodeVertex);
