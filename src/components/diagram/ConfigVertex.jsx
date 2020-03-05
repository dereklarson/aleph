// @format
import React from 'react';
import {connect} from 'react-redux';
// import Box from '@material-ui/core/Box';
import CallMergeIcon from '@material-ui/icons/CallMerge';
import _ from 'lodash';
// import {propsToStyle} from '@utils/helpers';
// import {useStyles} from '@style/classes';

export function PureConfigVertex({
  uid,
  styles,
  styleAssns,
  libAssns,
  styleProps,
}) {
  const icon = <CallMergeIcon />;
  // const classes = useStyles();

  let customProps = {};
  for (let style of styleAssns) {
    customProps = JSON.parse(_.get(styles, style, {text: '{}'}).text);
  }

  return (
    <div style={{position: 'relative'}}>
      <div key="shape" style={customProps} />
      <div
        key="text"
        style={{
          position: 'absolute',
          display: 'flex',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {icon} {uid}
      </div>
    </div>
  );
  // <Box className={classes.box} boxShadow="8" style={propsToStyle(styleProps)}>
  // </Box>
}

export default connect(state => ({
  styles: state.battery[state.context.location].styles,
}))(PureConfigVertex);
