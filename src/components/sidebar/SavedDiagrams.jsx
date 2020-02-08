// @format
import React from 'react';
import {connect} from 'react-redux';
import {List, ListSubheader} from '@material-ui/core';
// import _ from 'lodash';
import {generateList} from '@utils/generateList';
import {loadDiagram, deleteSavedDiagram} from '@ops/load';

function SavedDiagrams({location, diagrams, onLoadDiagram, onDeleteDiagram}) {
  let items = [];
  for (const [uid, content] of Object.entries(diagrams)) {
    let onClick = () => onLoadDiagram({location, content, uid});
    let onDelete = () => onDeleteDiagram({location, uid});
    items.push([uid, onClick, onDelete]);
  }

  return (
    <List>
      <ListSubheader inset>Saved Diagrams</ListSubheader>
      {generateList('listDel', items, 'saved_item', 'Load the diagram <>')}
    </List>
  );
}

export default connect(
  state => ({
    location: state.context.location,
    diagrams: state.diagrams[state.context.location],
  }),
  dispatch => ({
    onDeleteDiagram: payload => dispatch(deleteSavedDiagram(payload)),
    onLoadDiagram: payload => dispatch(loadDiagram(payload)),
  }),
)(SavedDiagrams);
