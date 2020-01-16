import React from 'react';

class Divbox extends React.Component {
  render() {
    if (this.props.boxtype === 'small') {
      return <div style={{height: 200, width: 200, border: '1px dashed red'}}>
        {this.props.children} </div>;
    } else if (this.props.boxtype === 'medium') {
      return <div style={{height: 800, width: 800, border: '1px dashed red'}}>
        {this.props.children} </div>;
    } else if (this.props.boxtype === 'big') {
      return <div style={{height: 400, width: 400, border: '1px dashed red'}}>
        {this.props.children} </div>;
    }
  }
}

export default Divbox
