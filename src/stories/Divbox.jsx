import React from 'react';
import _ from 'lodash';

class Divbox extends React.Component {
  render() {
    if (this.props.boxtype === 'small') {
      return <div style={{height: 200, width: 200, border: '1px dashed red'}}>
        {this.props.children} </div>;
    } else if (this.props.boxtype === 'medium') {
      return <div style={{height: 300, width: 300, border: '1px dashed red'}}>
        {this.props.children} </div>;
    } else if (this.props.boxtype === 'big') {
      return <div style={{height: 400, width: 400, border: '1px dashed red'}}>
        {this.props.children} </div>;
    } else if (_.has(this.props, 'squaresize')) {
      return <div style={{
        // display: 'flex',
        height: this.props.squaresize,
        width: this.props.squaresize,
        border: '1px dashed red'}}>
        {this.props.children} </div>;
    } else {
      return <div {...this.props} style={{border: '1px dashed red'}}>
        {this.props.children} </div>;
    }
  }
}

export default Divbox;
