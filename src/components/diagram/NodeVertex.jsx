// @format
import React from 'react';
import Fab from '@material-ui/core/Fab';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import {propsToStyle} from '@utils/helpers';

export default function NodeVertex({uid, sections, styleProps}) {
  // (${sections.length})`;
  const icon = <DonutSmallIcon style={{padding: 3}} />;
  return (
    <Fab variant="extended" style={propsToStyle(styleProps)}>
      {icon} {uid}
    </Fab>
  );
}
