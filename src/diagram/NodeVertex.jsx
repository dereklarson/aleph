// @format
import React from 'react';
import Fab from '@material-ui/core/Fab';
import CallMergeIcon from '@material-ui/icons/CallMerge';
import {propsToStyle} from '../utils/helpers';

export default function NodeVertex({name, sections, id, styleProps}) {
  const nodelabel = `${name}(${sections.length})`;
  const icon = <CallMergeIcon />;
  return (
    <Fab variant="extended" style={propsToStyle(styleProps)}>
      {icon} {nodelabel}
    </Fab>
  );
}
