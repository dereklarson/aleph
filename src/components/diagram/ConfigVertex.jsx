// @format
import React from 'react';
import Box from '@material-ui/core/Box';
import CallMergeIcon from '@material-ui/icons/CallMerge';
import {propsToStyle} from '@utils/helpers';
import {useStyles} from '@style/classes';

export default function ConfigVertex({uid, associations, styleProps}) {
  const nodelabel = `${uid}(${associations.length})`;
  const icon = <CallMergeIcon />;
  const classes = useStyles();

  return (
    <Box className={classes.box} boxShadow="8" style={propsToStyle(styleProps)}>
      {icon} {nodelabel}
    </Box>
  );
}
