// @format
import React from 'react';
import Box from '@material-ui/core/Box';
import CallMergeIcon from '@material-ui/icons/CallMerge';
import {propsToStyle} from '@utils/helpers';
import {useStyles} from '@style/styling';

export default function ConfigNodeVertex({uid, sections, styleProps}) {
  const nodelabel = `${uid}(${sections.length})`;
  const icon = <CallMergeIcon />;
  const classes = useStyles();

  return (
    <Box className={classes.box} boxShadow="8" style={propsToStyle(styleProps)}>
      {icon} {nodelabel}
    </Box>
  );
}
