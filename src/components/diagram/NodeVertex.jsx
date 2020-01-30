// @format
import React from 'react';
import Fab from '@material-ui/core/Fab';
import Badge from '@material-ui/core/Badge';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import {propsToStyle} from '@utils/helpers';
import {useStyles} from '@style/styling';

export default function NodeVertex({uid, sections, styleProps}) {
  const classes = useStyles();
  const icon = <DonutSmallIcon style={{padding: 3}} />;
  return (
    <Badge
      color="primary"
      anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
      className={classes.badge}
      badgeContent={sections.length}>
      <Fab variant="extended" style={propsToStyle(styleProps)}>
        {icon} {uid}
      </Fab>
    </Badge>
  );
}
