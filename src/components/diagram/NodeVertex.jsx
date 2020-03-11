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
  location,
  styles,
  styleAssns,
  library,
  libAssns,
  contextProps,
  env,
}) {
  const classes = useStyles();
  const defIcon = _.get(
    iconSource,
    `${location}node`,
    _.get(iconSource, 'node'),
  );
  const defStyle = JSON.parse(_.get(styles, 'node', {text: '{}'}).text);
  let customProps = defStyle;
  for (let style of styleAssns) {
    Object.assign(
      customProps,
      JSON.parse(_.get(styles, style, {text: '{}'}).text),
    );
  }
  Object.assign(
    customProps,
    propsToStyle({...contextProps, testing: env.testing}),
  );

  let types = [];
  libAssns.forEach(libId => types.push(_.get(library, libId, {type: ''}).type));
  let icon = types.includes('base') ? iconSource.basenode : defIcon;

  return (
    <TestWrapper uid={uid} env={env} contextProps={contextProps}>
      <Badge
        color="primary"
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        className={classes.badge}
        badgeContent={libAssns.length}>
        <div style={{position: 'relative'}}>
          <Box key="shape" boxShadow="8" style={customProps} />
          <Box key="text" className={classes.nodeText}>
            {icon} {titlize(uid)}
          </Box>
        </div>
      </Badge>
    </TestWrapper>
  );
}

export default connect(state => ({
  location: state.context.location,
  env: state.environment[state.context.location],
  styles: state.battery[state.context.location].styles,
  library: state.battery[state.context.location].library,
}))(PureNodeVertex);
