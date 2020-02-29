// @format
import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {propsToStyle} from '@utils/helpers';
import {useStyles} from '@style/classes';

export function CustomNodeVertex({uid, styleAssn, styleProps, styles}) {
  const classes = useStyles();
  // const styleString = `{"backgroundColor": "red", "borderRadius": 24}`;
  const styleString = _.get(styles, styleAssn, '{}');
  return (
    <div
      className={classes.box}
      style={{...propsToStyle(styleProps), ...JSON.parse(styleString)}}>
      {uid}
    </div>
  );
}

export default connect(state => ({
  styles: state.styles[state.context.location],
}))(CustomNodeVertex);
