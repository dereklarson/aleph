// @format
import React from 'react';
import Box from '@material-ui/core/Box';
import CallMergeIcon from '@material-ui/icons/CallMerge';
import {propsToStyle} from '../utils/helpers';

export default function NewNodeVertex({name, sections, id, styleProps}) {
  const nodelabel = `${name}(${sections.length})`;
  const icon = <CallMergeIcon />;
  return (
    <Box
      backgroundColor="lightgray"
      padding="0 16px"
      width="auto"
      minHeight="auto"
      minWidth="48"
      height="48"
      display="flex"
      justifyContent="space-evenly"
      alignItems="center"
      boxShadow={4}
      borderRadius="24"
      textAlign="center"
      style={propsToStyle(styleProps)}>
      {icon} {nodelabel}
    </Box>
  );
}
