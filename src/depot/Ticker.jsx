// @format
import React from 'react';
import {connect} from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import {Progress} from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';

function Ticker({tickertext, percent}) {
  return (
    <div>
      <Tooltip
        title="Displays currently running build cmd"
        placement="bottom"
        enterDelay={500}>
        <Typography
          noWrap="true"
          variant="body2"
          color="textSecondary"
          align="center"
          style={{backgroundColor: '#BFBFBF'}}>
          {tickertext}
        </Typography>
      </Tooltip>
      <Progress percent={percent} />
    </div>
  );
}

export default connect(state => ({
  tickertext: state.tickertext,
  percent: state.percent,
}))(Ticker);
