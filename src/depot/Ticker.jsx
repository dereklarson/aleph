// @format
import React from 'react';
import {connect} from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';
import Fab from '@material-ui/core/Fab';
import {Progress} from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';
import LogPopup from '../comcom/LogPopup';
import {modifyState} from '../utils/loaders';

export function PureTicker({logs, percent, tickertext, dagre, onDagre}) {
  const [logOpen, openLog] = React.useState(false);

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
      <LogPopup open={logOpen} text={logs} onClose={() => openLog(false)} />
      <Fab variant="extended" onClick={() => openLog(true)}>
        Log
      </Fab>
      <Fab onClick={() => onDagre(dagre)}>
        <SettingsOverscanIcon />
      </Fab>
    </div>
  );
}

export default connect(
  state => ({
    logs: state.stdout,
    percent: state.percent,
    tickertext: state.tickertext,
    dagre: state.dagre,
  }),
  dispatch => ({
    onDagre: dagre => dispatch(modifyState({dagre: !dagre})),
  }),
)(PureTicker);
