// @format
import React from 'react';
import clsx from 'clsx';
import {connect} from 'react-redux';
import {Drawer, Divider, List, ListSubheader} from '@material-ui/core';
import BulkActions from './BulkActions';
import SavedDiagrams from './SavedDiagrams';
import {generateList} from '@utils/generateList';
import {useStyles} from '@style/styling';
import {modify} from '@utils/reducers';

// TODO add this back in
// selected={location === config[0]}>

export function PureSidebar({onNavigate, location}) {
  const sidebarOptions = [
    ['configuration', () => onNavigate('configuration')],
    ['docker', () => onNavigate('docker')],
    ['pipeline', () => onNavigate('pipeline')],
    ['data', () => onNavigate('data')],
  ];

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
      onMouseEnter={event => setOpen(true)}
      onMouseLeave={ecent => setOpen(false)}>
      <Divider />
      <List>
        <ListSubheader inset> Locations </ListSubheader>
        {generateList(sidebarOptions, 'Switch to the <> environment')}
      </List>
      <Divider />
      <BulkActions setMenuOpen={setOpen} />
      <Divider />
      <SavedDiagrams />
    </Drawer>
  );
}

export default connect(
  state => ({location: state.context.location}),
  dispatch => ({
    onNavigate: location => dispatch(modify('context', {location})),
  }),
)(PureSidebar);
