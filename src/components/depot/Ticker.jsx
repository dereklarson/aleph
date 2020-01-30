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
import {modify} from '@data/reducers';
import {useStyles} from '@style/styling';
import {loadCore} from '@ops/load';
import RefreshIcon from '@material-ui/icons/Refresh';

export function PureTicker({
  location,
  dagre,
  operations,
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
          {operations.tickertext}
        </Typography>
      </Tooltip>
      <Progress percent={operations.percent} />
      <LogPopup
        open={logOpen}
        text={operations.logs}
        onClose={() => openLog(false)}
      />
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
    location: state.context.location,
    dagre: state.context.dagre,
    operations: state.operations,
  }),
  dispatch => ({
    onDagre: dagre => dispatch(modify('context', {dagre: !dagre})),
    onLoadLibrary: location => dispatch(loadCore('library', location)),
  }),
)(PureTicker);
