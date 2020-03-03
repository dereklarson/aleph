// @format
import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
// import {propsToStyle} from '@utils/helpers';
// import {useStyles} from '@style/classes';

export function CustomVertex({uid, styleAssn, styleProps, styles}) {
  // const classes = useStyles();
  let customProps = {};
  for (let style of styleAssn) {
    console.log('Looping style', style);
    customProps = JSON.parse(_.get(styles, style, {text: '{}'}).text);
    console.log('Derived Props:', customProps);
  }
  // customProps = {
  //   backgroundColor: 'transparent',
  //   borderRadius: '0',
  //   width: 0,
  //   height: 0,
  //   border: '50px solid transparent',
  //   borderBottomColor: 'red',
  //   position: 'relative',
  //   top: '-50px',
  //   '&::after': {
  //     content: `''`,
  //     position: 'absolute',
  //     left: '-20px',
  //     top: '50px',
  //     width: '0',
  //     height: '0',
  //     border: '50px solid transparent',
  //     borderTopColor: 'red',
  //   },
  // };
  // style={{...propsToStyle(styleProps), ...customProps}}
  // className={classes.box}
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
        {uid}
      </div>
    </div>
  );
}

export default connect(state => ({
  styles: state.styles[state.context.location],
}))(CustomVertex);
