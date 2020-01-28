// @format
import React from 'react';
import {connect} from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';
import SubjectIcon from '@material-ui/icons/Subject';
import Fab from '@material-ui/core/Fab';
import {Progress} from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';
import LogPopup from '@common/LogPopup';
import {modifyState} from '@utils/loaders';
import {useStyles} from '@style/styling';
import {loadCore} from '@utils/loaders';
import RefreshIcon from '@material-ui/icons/Refresh';

export function PureTicker({
  location,
  logs,
  percent,
  tickertext,
  dagre,
  onDagre,
  onLoadLibrary,
}) {
  const classes = useStyles();

  const [logOpen, openLog] = React.useState(false);

  return (
    <div>
      <Tooltip
        title="Displays currently running build cmd"
        placement="bottom"
        enterDelay={500}>
        <Typography noWrap={true} className={classes.ticker} variant="body2">
          {tickertext}
        </Typography>
      </Tooltip>
      <Progress percent={percent} />
      <LogPopup open={logOpen} text={logs} onClose={() => openLog(false)} />
      <Fab onClick={() => openLog(true)}>
        <SubjectIcon />
      </Fab>
      <Fab onClick={() => onDagre(dagre)}>
        <SettingsOverscanIcon />
      </Fab>
      <Fab onClick={() => onLoadLibrary(location)}>
        <RefreshIcon />
      </Fab>
    </div>
  );
}

export default connect(
  state => ({
    location: state.location,
    logs: state.stdout,
    percent: state.percent,
    tickertext: state.tickertext,
    dagre: state.dagre,
  }),
  dispatch => ({
    onDagre: dagre => dispatch(modifyState({dagre: !dagre})),
    onLoadLibrary: location => dispatch(loadCore('library', location)),
  }),
)(PureTicker);
