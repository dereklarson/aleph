// @format
import React from 'react';
import {connect} from 'react-redux';
import {List, ListSubheader, IconButton} from '@material-ui/core';
// import _ from 'lodash';
import {generateList} from '@utils/generateList';
import {loadCore, loadDiagram, deleteSavedDiagram} from '@ops/load';
import RefreshIcon from '@material-ui/icons/Refresh';

function SavedDiagrams({location, diagrams, dispatch}) {
  let items = [];
  let onRefresh = () => dispatch(loadCore('diagrams', [location]));
  for (const [uid, content] of Object.entries(diagrams)) {
    let onClick = () => dispatch(loadDiagram({location, content, uid}));
    let onDelete = () => dispatch(deleteSavedDiagram({location, uid}));
    items.push([uid, onClick, {onSecondary: onDelete}]);
  }

  return (
    <List>
      <ListSubheader inset>
        Saved Diagrams
        <IconButton onClick={() => onRefresh(location)}>
          <RefreshIcon />
        </IconButton>
      </ListSubheader>
      {generateList('listDel', items, 'saved_item', 'Load the diagram <>')}
    </List>
  );
}

export default connect(state => ({
  location: state.context.location,
  diagrams: state.diagrams[state.context.location],
}))(SavedDiagrams);
