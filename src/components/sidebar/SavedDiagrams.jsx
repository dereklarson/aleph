// @format
import React from 'react';
import {connect} from 'react-redux';
import {List, ListSubheader} from '@material-ui/core';
// import _ from 'lodash';
import {generateList} from '@utils/generateList';
import {modify, loadDiagram} from '@data/reducers';

function SavedDiagrams({location, diagrams, onLoadDiagram}) {
  let items = [];
  for (const [name, content] of Object.entries(diagrams)) {
    let onClick = () => onLoadDiagram({location, content, name});
    items.push([name, onClick]);
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
    onLoadDiagram: payload => {
      dispatch(loadDiagram(payload));
      dispatch(modify('context', {name: payload.name}));
    },
  }),
)(SavedDiagrams);
